import { Button } from "@/components/ui/button"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { validator } from "@/lib/validation"

const SignupForm = () => {
  const form = useForm<z.infer<typeof validator>>({
    resolver: zodResolver(validator),
    defaultValues: {
      username: "",
      password: "",
    },
  })

  function onSubmit(values: z.infer<typeof validator>) {
    console.log(values)
  }
  return (
    <Form {...form}>
      <div className="sm:w-420 flex-center flex-col">
        <img
          src="/assets/images/logo.png"
          alt="logo"
          className="h-10 w-10"
        />
        <h2 className="h3-bold md:h2-bold pt-2 ">Sign In</h2>
      </div>

      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-center flex-col gap-5 w-full mt-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input style={{ color: 'black' }} placeholder="Email" className="w-80" {...field} />
              </FormControl>
              <FormMessage className="text-red"/>
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
              <FormMessage className="text-red"/>
            </FormItem>
          )}
        />
        <Button type="submit" className="w-30" >LogIn</Button>
      </form>
    </Form>
  )
}

export default SignupForm