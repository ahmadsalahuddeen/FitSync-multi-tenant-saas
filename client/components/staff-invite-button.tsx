"use client";

import * as React from "react";
import { useRouter } from "next/navigation";

import { cn } from "@/lib/utils";
import { Button, ButtonProps, buttonVariants } from "@/components/ui/button";

import { Icons } from "@/components/icons";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import CreateStaffForm from "./create-staff-form";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { staffcreationSchema } from "@/validators/auth";
import { z } from "zod";
import { useMutation, useQueryClient } from "react-query";
import useAxiosAuth from "@/hooks/useAxiosAuth";
import { toast } from "sonner";
import { Divide } from "lucide-react";
import { useGymStore } from "@/store/gym";

interface StaffCreateButtonProps extends ButtonProps {}

export function StaffCreateButton({
  className,
  variant,
  ...props
}: StaffCreateButtonProps) {
  const axiosAuth = useAxiosAuth();
  const queryClient = useQueryClient()
  const router = useRouter();
  const { gym} = useGymStore()
  const [showNewGymDialog, setShowNewGymDialog] = React.useState(false);

  type Input = z.infer<typeof staffcreationSchema>;

  const form = useForm<Input>({
    resolver: zodResolver(staffcreationSchema),
    defaultValues: {
      email: "",
      role: "member",
    },
  });

  const {
    mutate: createStaffRequest,

    isError,
    isLoading,
    error,
  } = useMutation({
    mutationFn: async (input: Input) => {
      
        const response = await axiosAuth.post("/api/gym/staff/invite", {
          email: input.email,
          role: input.role,
        });
        console.log(response, "respones");
        return response.data;
  
    },
    onError:(err: any)=>{

toast.error(err.response.data.errors[0].message)
    },
    onSuccess: () => {

      queryClient.invalidateQueries({queryKey:  ["Staff", gym.id]})
      toast.success(`Invite in on the way!🚀`);
      setShowNewGymDialog(false);



    },
  });

  async function onSubmit(input: Input) {
    try {
      await createStaffRequest(input);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <Dialog open={showNewGymDialog} onOpenChange={setShowNewGymDialog}>
      <DialogTrigger asChild>
        <Button variant="default">
          {isLoading ? (
            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Icons.add className="mr-2 h-4 w-4" />
          )}
          Add Staff
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle> Invite a new staff</DialogTitle>
          <DialogDescription>
            An invitation will be sent to the provided email, guiding them
            through the onboarding process.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid gap-4 py-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <Input placeholder="youname@gmail.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="">
                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel >Role</FormLabel>
                      <FormControl>
                      <Select defaultValue="member">
              <SelectTrigger
                id="security-level"
                className="line-clamp-1 w-1/2 truncate"
              >
                <SelectValue className=" teamaspace-y-1 flex flex-col items-start px-4 py-2"  placeholder="Select level" />
              </SelectTrigger>
              <SelectContent >
                <SelectItem  value="owner" >
     
               Owner

                </SelectItem>
                <SelectItem value="member">

                       
                Member
                </SelectItem>
         
              </SelectContent>
            </Select>


                      </FormControl>
                      <FormDescription>
                        Owners have admin-level access, while members have
                        limited access.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <DialogFooter>
              <Button
              disabled={isLoading}
              type="submit">
                
                Send Invitation
            {isLoading ? (
              <Icons.spinner className="ml-2 h-4 w-4 animate-spin" />
              ) : (
                <Icons.arrowRight className="ml-2 h-4 w-4" />
                )}
                </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
