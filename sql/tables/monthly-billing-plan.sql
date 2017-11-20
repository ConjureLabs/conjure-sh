CREATE TABLE monthly_billing_plan (
  id SERIAL PRIMARY KEY,
  cost INT NOT NULL,
  parallel_container_limit INT NOT NULL,
  added TIMESTAMP WITH TIME ZONE NOT NULL,
  activated TIMESTAMP WITH TIME ZONE,
  deactivated TIMESTAMP WITH TIME ZONE
);
COMMENT ON TABLE billing_plan IS 'lookup table for active and past monthly billing plans';

INSERT INTO monthly_billing_plan(cost, parallel_container_limit, added, activated) VALUES(50, 1, NOW(), NOW());
INSERT INTO monthly_billing_plan(cost, parallel_container_limit, added, activated) VALUES(200, 4, NOW(), NOW());
INSERT INTO monthly_billing_plan(cost, parallel_container_limit, added, activated) VALUES(500, 10, NOW(), NOW());
INSERT INTO monthly_billing_plan(cost, parallel_container_limit, added, activated) VALUES(900, 20, NOW(), NOW());
