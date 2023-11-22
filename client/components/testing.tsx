import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from  './ui/dialog'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Button } from './ui/button'



type Props = {}

const TestingComp = (props: Props) => {
  return (
    <Dialog>
    <DialogHeader>
    <DialogTitle>Add Gym</DialogTitle>
    <DialogDescription>
      Provide details about your new gym. 
    </DialogDescription>
  </DialogHeader>
  <div className="grid gap-4 py-4">
    <div className="grid grid-cols-4 items-center gap-4">
      <Label htmlFor="name" className="text-right">
        Name
      </Label>
      <Input
        id="name"
        defaultValue="Pedro Duarte"
        className="col-span-3"
      />
    </div>
    <div className="grid grid-cols-4 items-center gap-4">
      <Label htmlFor="username" className="text-right">
        Username
      </Label>
      <Input
        id="username"
        defaultValue="@peduarte"
        className="col-span-3"
      />
    </div>
  </div>
  <DialogFooter>
    <Button type="submit">Save changes</Button>
  </DialogFooter>
  </Dialog>
    )
}

export default TestingComp