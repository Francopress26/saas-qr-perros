-- CreateTable
CREATE TABLE "Subscription" (
    "id" TEXT NOT NULL,
    "subscription_id" TEXT NOT NULL,
    "payer_id" TEXT,
    "payer_email" TEXT,
    "status" TEXT NOT NULL,
    "reason" TEXT NOT NULL,
    "preaproval_plan_id" TEXT NOT NULL,
    "transaction_amount" DECIMAL(65,30) NOT NULL,
    "start_date" TEXT NOT NULL,
    "billing_day" INTEGER NOT NULL,
    "next_payment_date" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Subscription_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Subscription_subscription_id_key" ON "Subscription"("subscription_id");

-- CreateIndex
CREATE UNIQUE INDEX "Subscription_userId_key" ON "Subscription"("userId");

-- AddForeignKey
ALTER TABLE "Subscription" ADD CONSTRAINT "Subscription_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
