-- =====================================================================
-- BPM Task Management System — PostgreSQL Schema
-- ---------------------------------------------------------------------
-- This schema demonstrates the relational data model behind the
-- frontend. In production the React app talks to a backend (e.g. Node /
-- .NET) which uses these tables. For the portfolio demo we emulate the
-- API with json-server, but this file shows real SQL knowledge.
-- =====================================================================

-- Drop existing tables (safe re-run during development)
DROP TABLE IF EXISTS request_history CASCADE;
DROP TABLE IF EXISTS requests CASCADE;
DROP TABLE IF EXISTS tasks CASCADE;
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS roles CASCADE;

-- ---------------------------------------------------------------------
-- roles: lookup table for role-based access control
-- ---------------------------------------------------------------------
CREATE TABLE roles (
    id          SERIAL PRIMARY KEY,
    name        VARCHAR(50) NOT NULL UNIQUE,           -- Admin, Manager, Employee
    description TEXT
);

-- ---------------------------------------------------------------------
-- users: system accounts. Each user belongs to one role.
-- ---------------------------------------------------------------------
CREATE TABLE users (
    id            SERIAL PRIMARY KEY,
    name          VARCHAR(120) NOT NULL,
    email         VARCHAR(150) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,               -- never store plaintext in production
    role_id       INTEGER NOT NULL REFERENCES roles(id),
    department    VARCHAR(120),
    phone         VARCHAR(40),
    created_at    TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_users_role ON users(role_id);

-- ---------------------------------------------------------------------
-- tasks: core work items moving through statuses
-- ---------------------------------------------------------------------
CREATE TABLE tasks (
    id          SERIAL PRIMARY KEY,
    title       VARCHAR(200) NOT NULL,
    description TEXT,
    status      VARCHAR(20) NOT NULL DEFAULT 'New'
                CHECK (status IN ('New', 'In Progress', 'Review', 'Completed')),
    priority    VARCHAR(10) NOT NULL DEFAULT 'Medium'
                CHECK (priority IN ('Low', 'Medium', 'High')),
    assignee_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
    created_at  TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at  TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_tasks_status   ON tasks(status);
CREATE INDEX idx_tasks_assignee ON tasks(assignee_id);

-- ---------------------------------------------------------------------
-- requests: BPM approval workflow items
-- ---------------------------------------------------------------------
CREATE TABLE requests (
    id          SERIAL PRIMARY KEY,
    title       VARCHAR(200) NOT NULL,
    type        VARCHAR(80)  NOT NULL,                 -- Отпуск, Командировка, etc.
    description TEXT,
    author_id   INTEGER NOT NULL REFERENCES users(id),
    status      VARCHAR(20) NOT NULL DEFAULT 'Submitted'
                CHECK (status IN ('Draft', 'Submitted', 'Approved', 'Rejected')),
    created_at  TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_requests_status ON requests(status);
CREATE INDEX idx_requests_author ON requests(author_id);

-- ---------------------------------------------------------------------
-- request_history: audit trail of each status change (workflow timeline)
-- ---------------------------------------------------------------------
CREATE TABLE request_history (
    id          SERIAL PRIMARY KEY,
    request_id  INTEGER NOT NULL REFERENCES requests(id) ON DELETE CASCADE,
    status      VARCHAR(20) NOT NULL,
    note        TEXT,
    changed_by  INTEGER REFERENCES users(id),
    changed_at  TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_history_request ON request_history(request_id);

-- =====================================================================
-- Seed data
-- =====================================================================
INSERT INTO roles (name, description) VALUES
    ('Admin',    'Полный доступ к системе'),
    ('Manager',  'Согласование заявок и управление задачами'),
    ('Employee', 'Создание задач и заявок');

INSERT INTO users (name, email, password_hash, role_id, department) VALUES
    ('Администратор Системы', 'admin@bank.tj',    '$2a$10$demo', 1, 'IT'),
    ('Менеджер Отдела',       'manager@bank.tj',  '$2a$10$demo', 2, 'Корпоративный бизнес'),
    ('Сотрудник Банка',       'employee@bank.tj', '$2a$10$demo', 3, 'Операционный отдел');

INSERT INTO tasks (title, description, status, priority, assignee_id) VALUES
    ('Проверить кредитную заявку №4521', 'Анализ платёжеспособности клиента', 'In Progress', 'High', 3),
    ('Обновить документацию по KYC',     'Актуализировать процедуры',          'New',         'Medium', 3);

-- =====================================================================
-- Example analytical queries (demonstrating SQL knowledge)
-- =====================================================================

-- Count tasks grouped by status
-- SELECT status, COUNT(*) AS total FROM tasks GROUP BY status ORDER BY total DESC;

-- All pending requests with their author name (JOIN)
-- SELECT r.id, r.title, r.type, u.name AS author, r.status
-- FROM requests r
-- JOIN users u ON u.id = r.author_id
-- WHERE r.status = 'Submitted';

-- Full approval timeline for a given request
-- SELECT h.status, h.note, h.changed_at, u.name AS changed_by
-- FROM request_history h
-- LEFT JOIN users u ON u.id = h.changed_by
-- WHERE h.request_id = 1
-- ORDER BY h.changed_at;
