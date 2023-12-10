"use client";

import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Row } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { isatty } from "tty";
import { useMutation, useQueryClient } from "react-query";
import useAxiosAuth from "@/hooks/useAxiosAuth";
import { useGymStore } from "@/store/gym";

// import { taskSchema } from "../data/schema"

export const labels = [
  {
    value: "true",
    label: "Active",
  },
  {
    value: "false",
    label: "InActive",
  },
];

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const queryClient = useQueryClient();
  const { gym } = useGymStore();
  const axiosAuth = useAxiosAuth();
  const staff = row.original;
  const status = row.getValue("isActive");
  const email = row.getValue("email") as string;


  const { mutate: changeStaffStatus } = useMutation({
    mutationFn: async (isActive: string) => {
      const response = await axiosAuth.post("/api/gym/staff/change-status", {
        isActive,
        email,
      });

      return response.data;
    },
    onError: (err: any) => {
      toast.error(err.response.data.errors[0].message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Staff", gym.id] });
      toast.success(`Status updated!`);
    },
  });

  const name = row.getValue("name");

  async function handleStatus() {
    try {
      const isActive = status === true ? `false` : `true`;
      changeStaffStatus(isActive);
    } catch (err) {
      console.log(err);
    }
  }
  async function handleResendEmail() {
    try {
      const isActive = status === true ? `false` : `true`;
      changeStaffStatus(isActive);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          <DotsHorizontalIcon className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        <DropdownMenuItem onClick={()=>{
          navigator.clipboard.writeText(email)
        }}>Copy email</DropdownMenuItem>
        {!name ? (
          <DropdownMenuItem onClick={handleResendEmail}>
            Resend Invite
          </DropdownMenuItem>
        ) : (
          <>
            <DropdownMenuItem onClick={handleStatus}>
              {status === true ? "InActive" : "Active"}
            </DropdownMenuItem>
            <DropdownMenuItem>Favorite</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="bg-red-500 bg-opacity-25">
              Delete
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
