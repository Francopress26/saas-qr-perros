'use client'

import React, { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { toast } from "@/components/ui/use-toast"
import { getSubscriptions } from '@/actions/admin-actions'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

const SearchSub = () => {
  const [searchParams, setSearchParams] = useState({
    status: '',
    reason: '',
    userId: ''
  })
  const [subscriptions, setSubscriptions] = useState([])
  const [loading, setLoading] = useState(false)
  const [selectedSubscription, setSelectedSubscription] = useState(null)
  const [modifiedAmounts, setModifiedAmounts] = useState({})

  const handleSearch = async () => {
    console.log(searchParams)
    setLoading(true)
    const response = await getSubscriptions(searchParams)
    if(!response.ok){
      setSubscriptions([])
      console.log(response.message)
      setLoading(false)
      toast({
        title: "Error",
        description: response.message,
        variant: "destructive",
      })
      return
    }
    console.log(response.subscriptions)
    setSubscriptions(response.subscriptions)
    setLoading(false)
    setModifiedAmounts({})
    return
  }

  const handleStatusChange = async (subscriptionId, newStatus) => {
    // Implement status change logic here
    console.log(`Changing status of ${subscriptionId} to ${newStatus}`)
    // After successful status change:
    toast({
      title: "Status Updated",
      description: `Subscription status changed to ${newStatus}`,
    })
  }

  const handleAmountChange = (subscriptionId, newAmount) => {
    setModifiedAmounts(prev => ({
      ...prev,
      [subscriptionId]: newAmount
    }))
  }

  const submitAmountChange = async (subscriptionId) => {
    const newAmount = modifiedAmounts[subscriptionId]
    // Implement amount change logic here
    //Llamo a la accion
    // After successful amount change:
    toast({
      title: "Amount Updated",
      description: `Subscription amount changed to $${newAmount}`,
    })
    // Clear the modified amount
    setModifiedAmounts(prev => {
      const newState = { ...prev }
      delete newState[subscriptionId]
      return newState
    })
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString()
  }

  return (
    <div className="flex justify-center min-h-[60vh] bg-gray-100 p-4">
      <div className="w-full  space-y-4 bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-bold text-center">Search Subscriptions</h2>
        <div className="flex flex-wrap gap-4 justify-center">
          <Select
            onValueChange={(value) => setSearchParams(prev => ({ ...prev, status: value }))}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="paused">Paused</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
          <Select
            onValueChange={(value) => setSearchParams(prev => ({ ...prev, reason: value }))}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Reason" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All</SelectItem>
              <SelectItem value="Plan 1">Plan 1</SelectItem>
              <SelectItem value="Plan 2">Plan 2</SelectItem>
              <SelectItem value="Plan 3">Plan 3</SelectItem>
            </SelectContent>
          </Select>
          <Input
            placeholder="User ID"
            value={searchParams.userId}
            onChange={(e) => setSearchParams(prev => ({ ...prev, userId: e.target.value }))}
            className="w-[180px]"
          />
          <Button onClick={handleSearch} disabled={loading}>
            {loading ? 'Searching...' : 'Search'}
          </Button>
        </div>

        {subscriptions.length > 0 && (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Reason</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {subscriptions.map((sub) => (
                <TableRow key={sub.id}>
                  <TableCell>{sub.subscription_id}</TableCell>
                  <TableCell>{sub.status}</TableCell>
                  <TableCell>{sub.reason}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Input
                        type="number"
                        value={modifiedAmounts[sub.id] ?? sub.transaction_amount}
                        onChange={(e) => handleAmountChange(sub.id, parseFloat(e.target.value))}
                        className="w-24"
                      />
                      {modifiedAmounts[sub.id] !== undefined && (
                        <Button
                          size="sm"
                          onClick={() => submitAmountChange(sub.id)}
                        >
                          Change Amount
                        </Button>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-x-2">
                      <Select
                        onValueChange={(value) => handleStatusChange(sub.id, value)}
                        defaultValue={sub.status}
                      >
                        <SelectTrigger className="w-[120px]">
                          <SelectValue placeholder="Change Status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="active">Activate</SelectItem>
                          <SelectItem value="paused">Pause</SelectItem>
                          <SelectItem value="cancelled">Cancel</SelectItem>
                        </SelectContent>
                      </Select>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setSelectedSubscription(sub)}
                          >
                            View Details
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                          <DialogHeader>
                            <DialogTitle>Subscription Details</DialogTitle>
                          </DialogHeader>
                          <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                              <span className="font-bold">ID:</span>
                              <span className="col-span-3">{sub.subscription_id}</span>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <span className="font-bold">Status:</span>
                              <span className="col-span-3">{sub.status}</span>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <span className="font-bold">Reason:</span>
                              <span className="col-span-3">{sub.reason}</span>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <span className="font-bold">Amount:</span>
                              <span className="col-span-3">${sub.transaction_amount}</span>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <span className="font-bold">Billing Day:</span>
                              <span className="col-span-3">{sub.billing_day}</span>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <span className="font-bold">Next Payment:</span>
                              <span className="col-span-3">{formatDate(sub.next_payment_date)}</span>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <span className="font-bold">Start Date:</span>
                              <span className="col-span-3">{formatDate(sub.start_date)}</span>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <span className="font-bold">Payer Email:</span>
                              <span className="col-span-3">{sub.payer_email || 'N/A'}</span>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <span className="font-bold">Payer ID:</span>
                              <span className="col-span-3">{sub.payer_id}</span>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <span className="font-bold">User ID:</span>
                              <span className="col-span-3">{sub.userId}</span>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  )
}

export default SearchSub