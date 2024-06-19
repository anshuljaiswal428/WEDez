import { Button } from "@/components/ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Cookies from 'js-cookie';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Loader from "@/components/shared/Loader";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { loginvalidator } from "@/lib/validation";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import React from "react";
import { Link } from "react-router-dom";

const SignInForm = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = React.useState(false);

  const loginForm = useForm<z.infer<typeof loginvalidator>>({
    resolver: zodResolver(loginvalidator),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  async function onSignIn(values: z.infer<typeof loginvalidator>) {
    // console.log("Check 1");
    setIsLoading(true);
    try {
      const response = await axios.post('http://localhost:8080/WEDez/SignIn', values);
      if (response.status === 200) {
        toast({ title: "Sign in successful", description: "You are now logged in." });
        Cookies.set('auth', 'true', { expires: 7 }); // Cookie expires in 7 days
        navigate('/');
      } else {
        toast({ title: "Sign in failed. Please try again." });
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          const { data } = error.response;
          toast({ title: "Sign in failed. Please try again.", description: data.error || error.response?.data?.message || error.message });
        } else {
          toast({ title: "Sign in failed. Please try again.", description: error.message });
        }
      } else {
        toast({ title: "Sign in failed. Please try again.", description: String(error) });
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="signin-form">
      <div className="sm:w-420 flex-center flex-col">
        <img
          src="/assets/images/logo.png"
          alt="logo"
          className="h-10 w-10"
        />
        <h2 className="h3-bold md:h2-bold pt-2">Sign In</h2>
      </div>
      <Form {...loginForm}>
        <form onSubmit={loginForm.handleSubmit(onSignIn)} className="flex flex-center flex-col gap-5 w-full mt-4">
          <FormField
            control={loginForm.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email or Username</FormLabel>
                <FormControl>
                  <Input style={{ color: 'black' }} placeholder="Email or Username" className="w-80" {...field} />
                </FormControl>
                <FormMessage className="text-red" />
              </FormItem>
            )}
          />
          <FormField
            control={loginForm.control}
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
            ) : "Log In"}
          </Button>
        </form>
        <p className="text-small-regular text-black text-center mt-2">
          Not have an account need to Sign Up?
          <Link to="/sign-up" className="text-small-semibold ml-1 text-[#F48FB1]">
            Sign Up
          </Link>
        </p>
      </Form>
    </div>
  );
}

export default SignInForm;
