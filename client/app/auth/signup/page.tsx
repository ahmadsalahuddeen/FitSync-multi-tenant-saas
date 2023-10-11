'use client';
import Container from '@/components/ui/container';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { zodResolver } from '@hookform/resolvers/zod';

import { useForm } from 'react-hook-form';
import { registerSchema } from '@/validators/auth';
import { z } from 'zod';
import { Icons } from '@/components/icons';
import { cn, countries } from '@/lib/utils';
import { ArrowRight, Ghost } from 'lucide-react';
type Props = {};

const SignUp = (props: Props) => {
  const [FormStep, setFormStep] = useState(0);

  // schema to ts types
  type Input = z.infer<typeof registerSchema>;

  // react hook form
  const form = useForm<Input>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      activeCustomers: '',
      businessName: '',
      confirmPassowrd: '',
      country: '',
      email: '',
      firstName: '',
      lastName: '',
      password: '',
      phoneNumber: '',
      refer: '',
    },
  });

  const liveName = form.watch('businessName');

  function onSubmit(data: Input) {
    console.log(data);
  }

  return (
    <>
      <div className=" absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 ">
        <Card className="w-[350px] md:w-[470px]">
          <CardHeader>
            <CardTitle>
              {FormStep === 0 ? 'Try FitSync for free' : `Setup ${liveName} `}
            </CardTitle>
            <CardDescription className="text-muted-foreground ">
            {FormStep === 0 ? 'Explore your free 14-day trial🔥.' : `Just a few more details to get started📈`}
             
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className=" space-y-3 "
              >
                {/* First Form Step  */}
                <div className={cn('space-y-2', { hidden: FormStep === 1 })}>
                  {/* First and Last Name */}
                  <div className="md:flex gap-4">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>First Name</FormLabel>
                          <FormControl>
                            <Input placeholder="John" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Last Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Doe" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Email */}
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address</FormLabel>
                        <FormControl>
                          <Input placeholder="you@yourdomain.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Passoword */}
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Create Password</FormLabel>
                        <FormControl>
                          <Input placeholder="" {...field} type="password" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* confirm password */}
                  <FormField
                    control={form.control}
                    name="confirmPassowrd"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirm Password</FormLabel>
                        <FormControl>
                          <Input placeholder="" {...field} type="password" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* second Form Step  */}
                <div className={cn('space-y-2', { hidden: FormStep === 0 })}>
                  {/* Business Name */}
                  <FormField
                    control={form.control}
                    name="businessName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Business Name</FormLabel>
                        <FormControl>
                          <Input placeholder="" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {/* active Cusomter */}
                  <FormField
                    control={form.control}
                    name="activeCustomers"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>How many customers do you have?</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select " />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {[
                              'none, launching Soon',
                              '0-100',
                              '101-300',
                              '301-600',
                              '600+',
                            ].map((noOfMember) => (
                              <SelectItem value={noOfMember}>
                                {noOfMember}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {/* phone Number */}
                  <FormField
                    control={form.control}
                    name="phoneNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input placeholder="" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* country */}
                  <FormField
                    control={form.control}
                    name="country"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Country</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select " />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="h-40">
                            {countries.map((country, i) => (
                              <SelectItem value={country.name}>
                                {country.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {/* Refer */}
                  <FormField
                    control={form.control}
                    name="refer"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Where did you hear about us?</FormLabel>
                        <FormControl>
                          <Input placeholder="from twitter/X?" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex gap-4">
                  <Button
                    type="submit"
                    className={cn({ hidden: FormStep === 0 })}
                  >
                    Submit
                  </Button>

                  <Button
                    type="button"
                    variant={'ghost'}
                    onClick={() => {
                      //triggers validation before moving next form step
                      form.trigger([
                        'firstName',
                        'lastName',
                        'email',
                        'password',
                        'confirmPassowrd',
                      ]);
                      const emailState = form.getFieldState('email');
                      const firstNameState = form.getFieldState('firstName');
                      const lastNameState = form.getFieldState('lastName');
                      const passwordState = form.getFieldState('password');
                      const confirmPassowordState =
                        form.getFieldState('confirmPassowrd');

                      // checks the validation result
                      if (!emailState.isDirty || emailState.invalid) return;
                      if (!firstNameState.isDirty || firstNameState.invalid)
                        return;
                      if (!lastNameState.isDirty || lastNameState.invalid)
                        return;
                      if (!passwordState.isDirty || passwordState.invalid)
                        return;
                      if (
                        !confirmPassowordState.isDirty ||
                        confirmPassowordState.invalid
                      )
                        return;

                      setFormStep(1);
                    }}
                    className={cn({ hidden: FormStep === 1 })}
                  >
                    Next Step
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>

                  <Button
                    onClick={() => setFormStep(0)}
                    type="button"
                    variant={'ghost'}
                    className={cn({ hidden: FormStep === 0 })}
                  >
                    Go Back
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default SignUp;
