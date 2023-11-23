import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import GymCreateForm from './create-gym-form';
import { PlusCircledIcon } from '@radix-ui/react-icons';
type Props = {}

const GymCreateButton = (props: Props) => {
  const [showNewGymDialog, setShowNewGymDialog] = React.useState(false);

  return (
  
    <Dialog open={showNewGymDialog} onOpenChange={setShowNewGymDialog}>
    <DialogTrigger asChild>
      <Button variant="default"> <PlusCircledIcon className="mr-2 h-5 w-5" />Create a new Gym</Button>
    </DialogTrigger>
    <DialogContent>
    <GymCreateForm/>
    </DialogContent>
  </Dialog>
    )
}

export default GymCreateButton