import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';

import React from 'react'

import { Controller, FormProvider, useForm, type FieldErrors } from 'react-hook-form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { formatWithDecimalNum } from '@/utils/formatWithDecimalNum';
import { CLIENT_TYPE, CREATE_EMPLOYEE, CREATE_PROJECT_MANAGEMENT, CREATE_REVIEW, EDIT_EMPLOYEE, EDIT_PROJECT_MANAGEMENT, EDIT_REVIEW } from '@/constants/constants';
import useProjectManagementContext from '@/store/projectManagement/projectManagementContext';
import type { ProjectManagementFormValues } from '../schema/projectManagementFormSchema';
import { useGetEmployeeList } from '@/hooks/useEmployeeList';
import { useGetReviewById } from '@/hooks/useReview';
import { reviewFormSchema, type ReviewFormValues } from '@/pages/schema/reviewFormSchema';
import { zodResolver } from '@hookform/resolvers/zod';



interface ReviewDialogProps {



}

const ReviewDialog: React.FC<ReviewDialogProps> = ({

}) => {

    const { data: reviewById, isLoading, refetch } = useGetReviewById({
        id: 0,
    });

    const zIsOpenDialog2 = useProjectManagementContext(
        (state) => state.zIsOpenDialog2
    );
    const zSetIsOpenDialog2 = useProjectManagementContext(
        (state) => state.zSetIsOpenDialog2
    );
    const zDialogTitle = useProjectManagementContext((state) => state.zDialogTitle);

    const form = useForm<ReviewFormValues>({
        resolver: zodResolver(reviewFormSchema), // Use Zod for validation
        defaultValues: {
            id: undefined,
            projectManagementId: 0,
            rate: 0,
            reviewDescription: "",
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

    const handleSubmitForm = async (data: ReviewFormValues) => {
        console.log("Form submitted ", data)
        // let statusType = zDialogTitle === CREATE_PROJECT_MANAGEMENT ? "Create" : "Edit"

        // if (!isValid) return

        // try {
        //     const ok = await confirm({
        //         title: "You won't be able to revert this!",
        //         description: `Are you sure you want to ${statusType}?`,
        //         confirmLabel: "Yes, Continue",
        //         cancelLabel: "No",
        //     })

        //     if (!ok) return

        //     let payload: CreateUpdateReviewRequest = {
        //         Id: data.id,
        //         ProjectManagementId: data.projectManagementId,
        //         Rate: data.rate,
        //         ReviewDescription: data.reviewDescription,
        //     }

        //     if (zDialogTitle === CREATE_PROJECT_MANAGEMENT) {
        //         createReview.mutate(payload, {
        //             onSuccess: (res) => showToast(res.ApiMessage, "success"),
        //             onError: (error: Error) => showToast(error.message, "error"),
        //         })
        //     } else {
        //         updateReview.mutate(payload, {
        //             onSuccess: (res) => showToast(res.ApiMessage, "success"),
        //             onError: (error: Error) => showToast(error.message, "error"),
        //         })
        //     }
        // } catch (error) {
        //     console.error("Failed to submit form", error)
        // }
    }


    const handleErrorForm = (errors: FieldErrors<ReviewFormValues>) => {
        console.log("Form Errors: ", errors);
    }

    return (
        <Dialog
            open={zIsOpenDialog2}
            onOpenChange={(open) => {
                zSetIsOpenDialog2(open);
                if (!open) {
                    reset(); // external reset callback
                }
            }}
        >
            <DialogContent className="max-w-lg w-full">
                <DialogHeader>
                    <DialogTitle>
                        {zDialogTitle === CREATE_REVIEW
                            ? CREATE_REVIEW
                            : EDIT_REVIEW}
                    </DialogTitle>
                    <DialogDescription>
                        {zDialogTitle === CREATE_REVIEW
                            ? "Fill in the details to add a new review."
                            : "Edit the review details below."}
                    </DialogDescription>
                </DialogHeader>
                <form
                    onSubmit={handleSubmit(handleSubmitForm, handleErrorForm)}
                    noValidate
                    className="space-y-3"
                >
                    <Input placeholder="Project Name" {...register("projectManagementId")} />
                    {errors.projectManagementId && (
                        <p className="text-red-500 text-sm">{errors.projectManagementId.message}</p>
                    )}

                    <Button type="submit" className="w-full cursor-pointer">
                        Save
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default ReviewDialog
