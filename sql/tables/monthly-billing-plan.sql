CREATE TABLE monthly_billing_plan (
  id SERIAL PRIMARY KEY,
  container_flat_fee_tenths_cent INT NOT NULL,
  container_hour_running_fee_tenths_cent INT NOT NULL,
  added TIMESTAMP WITH TIME ZONE NOT NULL,
  activated TIMESTAMP WITH TIME ZONE,
  deactivated TIMESTAMP WITH TIME ZONE
);
COMMENT ON TABLE monthly_billing_plan IS 'lookup table for active and past monthly billing plans';

INSERT INTO monthly_billing_plan(container_flat_fee_tenths_cent, container_hour_running_fee_tenths_cent, added, activated) VALUES(0, 0, NOW(), NOW());
INSERT INTO monthly_billing_plan(container_flat_fee_tenths_cent, container_hour_running_fee_tenths_cent, added, activated) VALUES(500, 25, NOW(), NOW());
