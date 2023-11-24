import React, { useEffect, useState } from "react";

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

import { Button, buttonVariants } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Icons } from "./icons";
import { isDirty, z } from "zod";
import { gymcreationSchema } from "@/validators/auth";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "react-query";
import axios from "@/lib/axios";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Alert, AlertDescription } from "./ui/alert";
import { CaretSortIcon, ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { getCountryCallingCode } from 'react-phone-number-input'

import { Select } from "./ui/select";
import { Input } from "./ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/command";
import { Country, ICountry, IState, State } from "country-state-city";
import { Check, CheckIcon, ChevronUpIcon, ChevronsUpDown } from "lucide-react";
import { ScrollArea } from "./ui/scroll-area";

type Props = {};

const GymCreateForm = (props: Props) => {
  let countryData: ICountry[] = ([] = Country.getAllCountries());
  const [stateData, setStateData] = useState<IState[] | undefined>();

  const [country, setCountry] = useState({
    "name": "fakeittillmakeit",
    "isoCode": "ID",
    "phonecode": "62",
    
});
  const [state, setState] = useState<IState | undefined>();

  useEffect(() => {
    setStateData(State.getStatesOfCountry(country?.isoCode));
  }, [country]);

  useEffect(() => {
    stateData && setState(stateData[0]);
  }, [stateData]);

  console.log(countryData);

  type Input = z.infer<typeof gymcreationSchema>;
  const [validateError, setValidateError] = useState("");

  const {
    mutate: doRequest,

    isError,
    isLoading,
    error,
  } = useMutation({
    mutationFn: async (input: Input) => {
      try {
        const response = await axios.post("/api/gym/create", {
          name: input.name,
          phoneNumber: input.phoneNumber,
        });
      } catch (err: any) {
        err.response.data.errors.map((err: any) => {
          toast.error(err.message);
        });
      }
    },
  });

  const form = useForm<Input>({
    resolver: zodResolver(gymcreationSchema),
    defaultValues: {
      name: "",
      phoneNumber: "",
    },
  });

  async function onSubmit(input: Input) {
    try {
const phoneNumber = `${country.phonecode}${input.phoneNumber}`




    } catch (err) {
      console.log(err);
    }
  }

  const watcher = form.watch();

  return (
    <Dialog>
      <Card className="border-0 shadow-none">
        <DialogHeader>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl ">Setup {watcher.name} </CardTitle>
            <CardDescription>
              Enter your gym details below to continue
            </CardDescription>
          </CardHeader>
        </DialogHeader>

        <CardContent className="grid gap-4">
          {isError && (
            <Alert variant="destructive" className="mb-4">
              <ExclamationTriangleIcon className="h-3 w-3" />
              <AlertDescription className="text-xs">
                {error as string}
              </AlertDescription>
            </Alert>
          )}
          {form.formState.errors["phoneNumber"] && (
            <Alert variant="destructive" className="mb-4">
              <ExclamationTriangleIcon className="h-3 w-3" />
              <AlertDescription className="text-xs">
                Invalid phone number
              </AlertDescription>
            </Alert>
          )}
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className=" relative space-y-3     "
            >
              <div className={cn("space-y-6")}>
                {/* gym Name */}
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Gym name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid gap-4 sm:grid-cols-2">
                  {/* country */}

                  <FormField
                    control={form.control}
                    name="country"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Country</FormLabel>
                        <Popover   modal={true}>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant="outline"
                                role="combobox"
                                className={cn(
                                  "w-[200px] justify-between",
                                  !field.value && "text-muted-foreground",
                                )}
                              >
                                {field.value
                                  ? countryData.find(
                                      (el) => el.name === field.value,
                                    )?.name
                                  : "Select country"}
                                <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-[200px] p-0 ">
                            <Command>
                              <CommandInput placeholder="Search country..." />
                              <CommandList>
                                <CommandEmpty>No language found.</CommandEmpty>
                                <CommandGroup className=" ">
                                  <ScrollArea
                                    className="flex max-h-40 flex-col"
                                    type="always"
                                  >
                                    {countryData.map((el) => (
                                      <CommandItem
                                        value={el.name}
                                        key={el.name}
                                        onSelect={() => {
                                          setCountry(el);
                                          form.setValue("country", el.name);
                                        }}
                                      >
                                        <CheckIcon
                                          className={cn(
                                            "mr-2 h-4 w-4",
                                            el.name === field.value
                                              ? "opacity-100"
                                              : "opacity-0",
                                          )}
                                        />
                                        {el.name}
                                      </CommandItem>
                                    ))}
                                  </ScrollArea>
                                </CommandGroup>
                              </CommandList>
                            </Command>
                          </PopoverContent>
                        </Popover>

                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* state */}
                  <FormField
                    control={form.control}
                    name="state"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>state</FormLabel>
                        <Popover modal={true}>
                          <PopoverTrigger
                            disabled={country.name === "fakeittillmakeit"}
                            asChild
                          >
                            <FormControl>
                              <Button
                                variant="outline"
                                role="combobox"
                                className={cn(
                                  "w-[200px] justify-between",
                                  !field.value && "text-muted-foreground",
                                )}
                              >
                                {field.value
                                  ? stateData?.find(
                                      (el) => el.name === field.value,
                                    )?.name
                                  : "Select state"}
                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-[200px] p-0">
                            <Command>
                              <CommandInput placeholder="Search state..." />
                              <CommandEmpty>No state found.</CommandEmpty>
                              <CommandGroup>
                                <ScrollArea
                                  className="flex h-40 max-h-[200px] flex-col"
                                  type="always"
                                >
                                  {stateData?.map((el) => (
                                    <CommandItem
                                      value={el.name}
                                      key={el.name}
                                      onSelect={() => {
                                        form.setValue("state", el.name);
                                      }}
                                    >
                                      <Icons.check
                                        className={cn(
                                          "mr-2 h-4 w-4",
                                          el.name === field.value
                                            ? "opacity-100"
                                            : "opacity-0",
                                        )}
                                      />
                                      {el.name}
                                    </CommandItem>
                                  ))}
                                </ScrollArea>
                              </CommandGroup>
                            </Command>
                          </PopoverContent>
                        </Popover>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* phone Number */}
                <FormField
                  control={form.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex gap-4">
                  <Button className="flex-1 	" type="submit">
                    Create Gym
                    {/* {isLoading ? "Creating Gym..." : "Create Gym "}
                    {isLoading ? (
                      <Icons.spinner className="ml-2 h-4 w-4 animate-spin" />
                    ) : (
                      <Icons.arrowRight className="ml-2 h-4 w-4 " />
                    )} */}
                  </Button>
                </div>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </Dialog>
  );
};

export default GymCreateForm;
