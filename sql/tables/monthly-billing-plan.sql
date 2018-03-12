CREATE TABLE monthly_billing_plan (
  id SERIAL PRIMARY KEY,
  cost INT NOT NULL,
  parallel_container_limit INT NOT NULL,
  added TIMESTAMP WITH TIME ZONE NOT NULL
);
COMMENT ON TABLE monthly_billing_plan IS 'lookup table for active and past monthly billing plans';

INSERT INTO monthly_billing_plan(cost, parallel_container_limit, added) VALUES(50, 1, NOW(), NOW());
INSERT INTO monthly_billing_plan(cost, parallel_container_limit, added) VALUES(200, 4, NOW(), NOW());
INSERT INTO monthly_billing_plan(cost, parallel_container_limit, added) VALUES(500, 10, NOW(), NOW());
INSERT INTO monthly_billing_plan(cost, parallel_container_limit, added) VALUES(900, 20, NOW(), NOW());
