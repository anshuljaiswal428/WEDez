import { Button } from "@/components/ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Loader from "@/components/shared/Loader";
import axios from 'axios';
import React from "react";
import { validator } from "@/lib/validation";

const SignupForm = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = React.useState(false);

  const form = useForm<z.infer<typeof validator>>({
    resolver: zodResolver(validator),
    defaultValues: {
      name: "",
      email: "",
      username: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof validator>) {
    setIsLoading(true);
    try {
      const response = await axios.post('http://localhost:8080/WEDez/SignUp', values);
      if (response.status === 201) {
        toast({ title: "Sign up successful", description: "Your account has been created." });
        navigate('/sign-in');
      } else {
        toast({ title: "Sign up failed. Please try again." });
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          const { data } = error.response;
          if (data.error === 'Username and email both already exist!') {
            toast({ title: "Sign up failed. Please try again.", description: 'Username and email both already exist!' });
          } else if (data.error === 'Email already exists!' || data.error === 'Username already exists!') {
            toast({ title: "Sign up failed. Please try again.", description: data.error });
          } else {
            toast({ title: "Sign up failed. Please try again.", description: error.response?.data?.message || error.message });
          }
        } else {
          toast({ title: "Sign up failed. Please try again.", description: error.message });
        }
      } else {
        toast({ title: "Sign up failed. Please try again.", description: String(error) });
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="signup-form">
      <div className="sm:w-420 flex-center flex-col">
        <img
          src="/assets/images/logo.png"
          alt="logo"
          className="h-10 w-10"
        />
        <h2 className="h3-bold md:h2-bold pt-2">Create a new account</h2>
        <p className="text-light-3 small-medium md:base-regular mt-2">
          To use WEDez, please enter your details
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-center flex-col gap-5 w-full mt-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input style={{ color: 'black' }} placeholder="Full Name" className="w-80" {...field} />
                </FormControl>
                <FormMessage className="text-red" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input style={{ color: 'black' }} placeholder="Email" className="w-80" {...field} />
                </FormControl>
                <FormMessage className="text-red" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input style={{ color: 'black' }} placeholder="Username" className="w-80" {...field} />
                </FormControl>
                <FormMessage className="text-red" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input style={{ color: 'black' }} placeholder="Password" type="password" className="w-80" {...field} />
                </FormControl>
                <FormMessage className="text-red" />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-30" disabled={isLoading}>
            {isLoading ? (
              <div className="flex-center gap-2">
                <Loader /> Loading...
              </div>
            ) : "Sign up"}
          </Button>
        </form>
        <p className="text-small-regular text-black text-center mt-2">
          Already have an account?
          <Link to="/sign-in" className="text-small-semibold ml-1 text-[#F48FB1]">
            Log in
          </Link>
        </p>
      </Form>
    </div>
  );
}

export default SignupForm;
