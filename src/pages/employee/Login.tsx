import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
    CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useLogin } from "@/hooks/useAuth";
import type { LoginPayload } from "@/types/auth";
import useSharedStore from "@/store/sharedStore";
import { useNavigate } from "react-router-dom";
import useRedirect from "@/hooks/useRedirect";

// ✅ Schema for validation
const loginSchema = z.object({
    email: z.string().email("Please enter a valid email."),
    password: z.string().min(6, "Password must be at least 6 characters."),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const Login = () => {
    useRedirect();
    const zSetLoading = useSharedStore((state) => state.zSetLoading);

    const form = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const login = useLogin();
    const navigate = useNavigate();
    const onSubmit = (values: LoginFormValues) => {

        const payload: LoginPayload = {
            Email: values.email,
            Password: values.password,
            UserType: "employee", // or whatever your API expects
        };

        login.mutate(payload, {

            onSuccess: () => {
                // alert("Login successful!");
                navigate("/employee/in");
                zSetLoading(false)
            },
            onError: (error) => {
                // alert((error as Error).message);
            },
        });

    };

    login.isPending ? zSetLoading(true) : zSetLoading(false);

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-900 px-4">
            <Card className="w-full max-w-md shadow-lg rounded-2xl">
                <CardHeader>
                    <CardTitle className="text-center text-2xl font-bold">
                        Employee Login
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            {/* Email */}
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="email"
                                                placeholder="Enter your email"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Password */}
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="password"
                                                placeholder="Enter your password"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <Button
                                type="submit"
                                className="w-full"
                                disabled={login.isPending}
                            >
                                {login.isPending ? "Logging in..." : "Login"}
                            </Button>

                            {login.error && (
                                <p className="text-sm text-red-500 text-center">
                                    {(login.error as Error).message}
                                </p>
                            )}
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    );
};

export default Login;
