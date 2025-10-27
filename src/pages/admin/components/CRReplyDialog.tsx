import { useConfirmDialog } from '@/hooks/useConfirmDialog';
import useSwal from '@/hooks/useSwal';
import useClientRequestContext from '@/store/clientRequest/clientRequestContext';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect } from 'react'
import { useForm, type FieldErrors } from 'react-hook-form';
import { crReplyFormSchema, type CRReplyFormValues } from '../schema/crReplyFormSchema';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCreateCRReply } from '@/hooks/useClientRequest';
import type { CreateCRReplyRequest } from '@/types/clientrequest';
import useSharedStore from '@/store/sharedStore';


const CRReplyDialog = () => {

    const zIsOpenDialog = useClientRequestContext(
        (state) => state.zIsOpenDialog
    );
    const zSetIsOpenDialog = useClientRequestContext(
        (state) => state.zSetIsOpenDialog
    );
    const zDialogTitle = useClientRequestContext((state) => state.zDialogTitle);
    const zCRId = useClientRequestContext((state) => state.zCRId);
    const zCREmail = useClientRequestContext((state) => state.zCREmail);
    const zSetLoading = useSharedStore((state) => state.zSetLoading);
    const { showConfirm, showToast } = useSwal();
    const { confirm, ConfirmDialog } = useConfirmDialog();
    const createCRReply = useCreateCRReply();
    // const updateReview = useUpdateReview();
    const form = useForm<CRReplyFormValues>({
        resolver: zodResolver(crReplyFormSchema), // Use Zod for validation
        defaultValues: {
            id: undefined,
            email: "",
            message: "",
        },
        //for validation way choices "onBlur"(When you exit the textbox hover) | "onChange"(When you change the field not recommended performance issue) | "onSubmit" (Default and when user click the button) | "onTouched (on the first load event and every change event)" | "all" (Both change and blur event)
        mode: "onTouched",
    });
    const {
        register,
        control,
        handleSubmit,
        formState,
        watch,
        getValues,
        setValue,
        reset,
        trigger,
    } = form;
    const {
        errors,
        touchedFields,
        dirtyFields,
        isDirty,
        isValid,
        isSubmitting,
        isSubmitted,
        isSubmitSuccessful,
        submitCount,
    } = formState;

    const handleSubmitForm = async (data: CRReplyFormValues) => {
        console.log("Form submitted ", data)
        // let statusType = zIsCreateReview ? "Create" : "Edit"

        if (!isValid) return

        try {
            const ok = await confirm({
                title: "You won't be able to revert this!",
                description: `Are you sure you want to Create?`,
                confirmLabel: "Yes, Continue",
                cancelLabel: "No",
            })

            if (!ok) return
            zSetLoading(true)
            let payload: CreateCRReplyRequest = {
                Id: data.id,
                To: data.email,
                Subject: "Jep Construction",
                Body: data.message,
            }

            createCRReply.mutate(payload, {
                onSuccess: (res) => {
                    showToast(res.ApiMessage, "success")
                    zSetLoading(false)
                },
                onError: (error: Error) => showToast(error.message, "error"),
            })

        } catch (error) {
            console.error("Failed to submit form", error)
        }
    }


    const handleErrorForm = (errors: FieldErrors<CRReplyFormValues>) => {
        console.log("Form Errors: ", errors);
    }

    useEffect(() => {
        setValue("id", zCRId, { shouldValidate: true });
        setValue("email", zCREmail, { shouldValidate: true });
    }, [zCREmail])

    return (
        <>
            <Dialog
                open={zIsOpenDialog}
                onOpenChange={(open) => {
                    zSetIsOpenDialog(open);
                    // if (!open) {
                    //     zSetReviewId(0);
                    //     clearReviewAEData();
                    // }
                }}
            >
                <DialogContent className="max-w-lg w-full">
                    <DialogHeader>
                        <DialogTitle>
                            {/* {zIsCreateReview
                                ? CREATE_REVIEW
                                : EDIT_REVIEW} */}
                            Create Email
                        </DialogTitle>
                        <DialogDescription>
                            {/* {zIsCreateReview
                                ? "Fill in the details to add a new review."
                                : "Edit the review details below."} */}
                            Fill in the details to add a new email
                        </DialogDescription>
                    </DialogHeader>
                    <form
                        onSubmit={handleSubmit(handleSubmitForm, handleErrorForm)}
                        noValidate
                        className="space-y-3"
                    >
                        <Input placeholder="Email" {...register("email")} disabled={true} />
                        {errors.email && (
                            <p className="text-red-500 text-sm">{errors.email.message}</p>
                        )}
                        <div className="flex flex-col space-y-1">
                            <Label htmlFor="message">Message</Label>
                            <textarea
                                id="message"
                                placeholder="Write your message..."
                                {...register("message")}
                                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                            />
                            {errors.message && (
                                <p className="text-red-500 text-sm">{errors.message.message}</p>
                            )}
                        </div>
                        <Button type="submit" className="w-full cursor-pointer">
                            Save
                        </Button>
                    </form>
                </DialogContent>
            </Dialog>
            {ConfirmDialog}
        </>

    );
}

export default CRReplyDialog
