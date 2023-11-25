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


// TODO: fetch all gyms related to the user and update the dummy values
const groups = [
  {
    label: "Gyms",
    teams: [
      {
        label: "Power Fitness",
        value: "personal",
      },
    ],
  },
  {
    label: "Gyms",
    teams: [
      {
        label: "Acme Inc.",
        value: "acme-inc",
      },
      {
        label: "Monsters Inc.",
        value: "monsters",
      },
    ],
  },
  
]

type Gym = (typeof groups)[number]["teams"][number]

type PopoverTriggerProps = React.ComponentPropsWithoutRef<typeof PopoverTrigger>

interface GymSwitcherProps extends PopoverTriggerProps {}

export default function GymSwitcher({ className }: GymSwitcherProps) {


  const [gymName, setGymName] = React.useState('')
  const [open, setOpen] = React.useState(false)
  const [showNewGymDialog, setShowNewGymDialog] = React.useState(false)
  const [selectedGym, setSelectedGym] = React.useState<Gym>(
    groups[0].teams[0]
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
                src={`https://avatar.vercel.sh/${selectedGym.value}.png`}
                alt={selectedGym.label}
              />
              <AvatarFallback>SC</AvatarFallback>
            </Avatar>
            {selectedGym.label}
            <CaretSortIcon className="ml-auto h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandList>
              <CommandInput placeholder="Search team..." />
              <CommandEmpty>No team found.</CommandEmpty>
              {groups.map((group) => (
                <CommandGroup key={group.label} heading={group.label}>
                  {group.teams.map((team) => (
                    <CommandItem
                      key={team.value}
                      onSelect={() => {
                        setSelectedGym(team)
                        setOpen(false)
                      }}
                      className="text-sm"
                    >
                      <Avatar className="mr-2 h-5 w-5">
                        <AvatarImage
                          src={`https://avatar.vercel.sh/${team.value}.png`}
                          alt={team.label}
                          className="grayscale"
                        />
                        <AvatarFallback>SC</AvatarFallback>
                      </Avatar>
                      {team.label}
                      <CheckIcon
                        className={cn(
                          "ml-auto h-4 w-4",
                          selectedGym.value === team.value
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                    </CommandItem>
                  ))}
                </CommandGroup>
              ))}
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
        <GymCreateForm/>
      </DialogContent>
    </Dialog>
     
  )
}
