CREATE TABLE billing_plan (
  id SERIAL PRIMARY KEY,
  container_build_fee_cents INT NOT NULL,
  container_running_fee_cents INT NOT NULL,
  is_primary BOOLEAN DEFAULT FALSE,
  added TIMESTAMP WITH TIME ZONE NOT NULL,
  activated TIMESTAMP WITH TIME ZONE,
  deactivated TIMESTAMP WITH TIME ZONE
);
COMMENT ON TABLE billing_plan IS 'lookup table for active and past billing plans';

INSERT INTO billing_plan(container_flat_fee_tenths_cent, container_hour_running_fee_tenths_cent, added, activated) VALUES(0, 0, NOW(), NOW());
INSERT INTO billing_plan(container_flat_fee_tenths_cent, container_hour_running_fee_tenths_cent, is_primary, added, activated) VALUES(50, 15, TRUE, NOW(), NOW());
