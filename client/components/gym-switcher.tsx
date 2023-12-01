"use client"

import * as React from "react"
import {
  CaretSortIcon,
  CheckIcon,
  PlusCircledIcon,
} from "@radix-ui/react-icons"

import { cn } from "@/lib/utils"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import GymCreateForm from "./create-gym-form"
import { useGymStore, useGymsStore } from "@/store/gym"

import { useRouter } from "next/navigation"
import { Gym } from "@/types/types"







type PopoverTriggerProps = React.ComponentPropsWithoutRef<typeof PopoverTrigger>

interface GymSwitcherProps extends PopoverTriggerProps {}

export default function GymSwitcher({ className }: GymSwitcherProps) {

  const {gyms} = useGymsStore()
  const { gym, setGym } = useGymStore()
const router = useRouter()
  const [gymName, setGymName] = React.useState('')
  const [open, setOpen] = React.useState(false)
  const [showNewGymDialog, setShowNewGymDialog] = React.useState(false)
  const [selectedGym, setSelectedGym] = React.useState<Gym | null>(
    gym
  )

  return (
    <Dialog  open={showNewGymDialog} onOpenChange={setShowNewGymDialog}>
      <Popover  open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            aria-label="Select a team"
            className={cn(" w-[200px]  justify-between   ", className)}
          >
            <Avatar className="mr-2 h-5 w-5">
              <AvatarImage
                src={`https://avatar.vercel.sh/.png`}
                alt={gym?.name}
              />
              <AvatarFallback>SC</AvatarFallback>
            </Avatar>
            {gym?.name}
            <CaretSortIcon className="ml-auto h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandList>
              <CommandInput placeholder="Search team..." />
              <CommandEmpty>No team found.</CommandEmpty>
              <CommandGroup heading={'gyms'}>
              {gyms.map((gymEl) => (

                    <CommandItem
                      key={gymEl.name}
                      onSelect={() => {
                        setGym(gymEl)
                        // setSelectedGym(gymEl)
                        setOpen(false)
                        router.push(`/dashboard/${gym.id}/home`)
                        
                      }}
                      className="text-sm"
                    >
                      <Avatar className="mr-2 h-5 w-5">
                        <AvatarImage
                          src={`https://avatar.vercel.sh/.png`}
                          alt={gymEl.name}
                          className="grayscale"
                        />
                        <AvatarFallback>SC</AvatarFallback>
                      </Avatar>
                      {gymEl.name}
                      <CheckIcon
                        className={cn(
                          "ml-auto h-4 w-4",
                          gym?.id === gymEl.id
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                    </CommandItem>

                  ))}
                  </CommandGroup>
            </CommandList>
            <CommandSeparator />
            <CommandList>
              <CommandGroup>
                <DialogTrigger asChild>
                  <CommandItem
                    onSelect={() => {
                      setOpen(false)
                      setShowNewGymDialog(true)
                    }}
                  >
                    <PlusCircledIcon className="mr-2 h-5 w-5" />
                    Add New Gym
                  </CommandItem>
                </DialogTrigger>
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <DialogContent>
        <GymCreateForm setShowNewGymDialog={setShowNewGymDialog} />
      </DialogContent>
    </Dialog>
     
  )
}
