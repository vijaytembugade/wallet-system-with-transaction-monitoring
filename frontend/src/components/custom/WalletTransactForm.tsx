import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { transactWallet } from "@/apis/transactWallet";
import useHandleTransact from "@/hooks/useHandleTransact";

const WalletTransactForm = () => {
  const {
    amount,
    type,
    description,
    setAmount,
    setType,
    setDescription,
    handleTransact,
  } = useHandleTransact();

  return (
    <div className="flex w-full max-w-sm flex-col gap-6">
      <Tabs
        defaultValue="CREDIT"
        onValueChange={(value) => setType(value as "CREDIT" | "DEBIT")}
        value={type}
      >
        <TabsList>
          <TabsTrigger value="CREDIT">Credit</TabsTrigger>
          <TabsTrigger value="DEBIT">Debit</TabsTrigger>
        </TabsList>
        <TabsContent value="CREDIT">
          <Card>
            <CardHeader>
              <CardTitle>Credit</CardTitle>
              <CardDescription>Add money to your wallet</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="grid gap-3">
                <Label htmlFor="tabs-demo-name">Amount</Label>
                <Input
                  type="number"
                  id="tabs-demo-name"
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="tabs-demo-name">Description</Label>
                <Input
                  type="text"
                  id="tabs-demo-name"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleTransact}>Add to wallet</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="DEBIT">
          <Card>
            <CardHeader>
              <CardTitle>Debit</CardTitle>
              <CardDescription>Withdraw money from your wallet</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="grid gap-3">
                <Label htmlFor="tabs-demo-current">Amount</Label>
                <Input
                  id="tabs-demo-current"
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="tabs-demo-current">Description</Label>
                <Input
                  id="tabs-demo-current"
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleTransact}>Withdraw from wallet</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default WalletTransactForm;
