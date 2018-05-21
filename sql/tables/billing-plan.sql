CREATE TABLE billing_plan (
  id SERIAL PRIMARY KEY,
  container_build_fee_cents INT NOT NULL,
  container_hourly_running_fee_cents INT NOT NULL,
  is_primary BOOLEAN DEFAULT FALSE,
  added TIMESTAMP WITH TIME ZONE NOT NULL,
  activated TIMESTAMP WITH TIME ZONE,
  deactivated TIMESTAMP WITH TIME ZONE
);
COMMENT ON TABLE billing_plan IS 'lookup table for active and past billing plans';

INSERT INTO billing_plan(container_build_fee_cents, container_hourly_running_fee_cents, added, activated) VALUES(0, 0, NOW(), NOW());
INSERT INTO billing_plan(container_build_fee_cents, container_hourly_running_fee_cents, is_primary, added, activated) VALUES(40, 20, TRUE, NOW(), NOW());
