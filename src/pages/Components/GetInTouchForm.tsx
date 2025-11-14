import * as React from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    FormControl,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useCreateClientRequest } from "@/hooks/useClientList"
import { useConfirmDialog } from "@/hooks/useConfirmDialog"
import type { CreateUpdateHomeRequest } from "@/types/home"
import useSwal from "@/hooks/useSwal"
import { useCreateHome } from "@/hooks/useHome"

// ✅ Schema
const schema = z.object({
    id: z.number().optional(),
    // projectName: z.string().min(2, "Project Name must be at least 2 characters."),
    projectName: z.string().optional(),
    name: z.string().min(2, "Name must be at least 2 characters."),
    email: z.string().email("Invalid email."),
    mobileNumber: z
        .string()
        .min(11, "Mobile number must be at least 11 digits.")
        .max(13, "Mobile number must not exceed 13 digits."),
    message: z.string().min(1, "Message is required."),
})

type FormData = z.infer<typeof schema>


const GetInTouchForm = () => {
    const { confirm, ConfirmDialog } = useConfirmDialog();
    const { showToast } = useSwal();
    const createHome = useCreateHome();

    const form = useForm<FormData>({
        resolver: zodResolver(schema),
        defaultValues: {
            projectName: "",
            name: "",
            email: "",
            mobileNumber: "",
            message: "",
        },
        mode: "onTouched",
    });

    const { handleSubmit } = form;

    const onSubmit = async (data: FormData) => {
        console.log("Form Submitted:", data);

        const ok = await confirm({
            title: "You won't be able to revert this!",
            description: `Are you sure you want to send?`,
            confirmLabel: "Yes, Continue",
            cancelLabel: "No",
        });

        if (!ok) return;

        const payload: CreateUpdateHomeRequest = {
            ProjectName: data.projectName,
            Name: data.name,
            Email: data.email,
            MobileNumber: data.mobileNumber,
            Message: data.message,
        };

        try {
            await createHome.mutateAsync(payload, {
                onSuccess: (res) => showToast(res.ApiMessage, "success"),
                onError: (error: Error) => showToast(error.message, "error"),
            });
        } catch (error) {
            console.error("Failed to submit form", error);
        }
    };

    return (
        <Form {...form}>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-6 max-w-lg mx-auto mb-2"
            >
                {/* Project Name */}
                {/* <FormField
                    control={form.control}
                    name="projectName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Project Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Project Name" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                /> */}

                {/* Name */}
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Your name" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Email */}
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email Address</FormLabel>
                            <FormControl>
                                <Input type="email" placeholder="you@example.com" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Phone Number */}
                <FormField
                    control={form.control}
                    name="mobileNumber"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Phone Number</FormLabel>
                            <FormControl>
                                <Input type="tel" placeholder="ex:09123456789" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Message */}
                <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Message</FormLabel>
                            <FormControl>
                                <Textarea placeholder="Write your message..." {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit" className="w-full cursor-pointer">
                    Send Message
                </Button>
            </form>

            {/* Ensure ConfirmDialog is rendered */}
            {ConfirmDialog}
        </Form>
    );
};

export default GetInTouchForm
