import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';

import React, { useEffect } from 'react'

import { Controller, FormProvider, useForm, type FieldErrors } from 'react-hook-form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { formatWithDecimalNum } from '@/utils/formatWithDecimalNum';
import { CLIENT_TYPE, CREATE_EMPLOYEE, CREATE_PROJECT_MANAGEMENT, CREATE_REVIEW, EDIT_EMPLOYEE, EDIT_PROJECT_MANAGEMENT, EDIT_REVIEW } from '@/constants/constants';
import useProjectManagementContext from '@/store/projectManagement/projectManagementContext';
import type { ProjectManagementFormValues } from '../schema/projectManagementFormSchema';
import { useGetEmployeeList } from '@/hooks/useEmployeeList';
import { useCreateReview, useGetReviewById, useUpdateReview } from '@/hooks/useReview';
import { reviewFormSchema, type ReviewFormValues } from '@/pages/schema/reviewFormSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { StarRating } from '@/components/StarRating';
import { Label } from '@/components/ui/label';
import useReviewContext from '@/store/review/reviewContext';
import useSwal from '@/hooks/useSwal';
import { useConfirmDialog } from '@/hooks/useConfirmDialog';
import type { CreateUpdateReviewRequest } from '@/types/review';
import { getJwtUserId } from '@/utils/getJwtRoleId';



interface ReviewDialogProps {



}

const ReviewDialog: React.FC<ReviewDialogProps> = ({

}) => {
    const userId = getJwtUserId();
    const zReviewId = useProjectManagementContext(
        (state) => state.zReviewId
    );
    const zSetReviewId = useProjectManagementContext(
        (state) => state.zSetReviewId
    );
    const { data: reviewById, isLoading, refetch } = useGetReviewById({
        id: zReviewId,
    });

    const zIsOpenDialog2 = useProjectManagementContext(
        (state) => state.zIsOpenDialog2
    );
    const zSetIsOpenDialog2 = useProjectManagementContext(
        (state) => state.zSetIsOpenDialog2
    );
    const zDialogTitle = useProjectManagementContext((state) => state.zDialogTitle);
    const zReviewAEData = useReviewContext((state) => state.zReviewAEData);
    const zIsCreateReview = useReviewContext((state) => state.zIsCreateReview);
    const zProjectManagementId = useProjectManagementContext((state) => state.zProjectManagementId);
    const clearReviewAEData = useReviewContext((state) => state.clearReviewAEData);
    const { showConfirm, showToast } = useSwal();
    const { confirm, ConfirmDialog } = useConfirmDialog();
    const createReview = useCreateReview();
    const updateReview = useUpdateReview();
    const form = useForm<ReviewFormValues>({
        resolver: zodResolver(reviewFormSchema), // Use Zod for validation
        defaultValues: {
            id: undefined,
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
        let statusType = zIsCreateReview ? "Create" : "Edit"

        if (!isValid) return

        try {
            const ok = await confirm({
                title: "You won't be able to revert this!",
                description: `Are you sure you want to ${statusType}?`,
                confirmLabel: "Yes, Continue",
                cancelLabel: "No",
            })

            if (!ok) return

            let payload: CreateUpdateReviewRequest = {
                Id: zReviewId,
                UserId: userId,
                ProjectManagementId: zProjectManagementId,
                Rate: data.rate,
                ReviewDescription: data.reviewDescription,
            }

            if (zIsCreateReview) {
                createReview.mutate(payload, {
                    onSuccess: (res) => {
                        showToast(res.ApiMessage, "success")
                    },
                    onError: (error: Error) => showToast(error.message, "error"),
                })
            } else {
                updateReview.mutate(payload, {
                    onSuccess: (res) => {
                        showToast(res.ApiMessage, "success")
                    },
                    onError: (error: Error) => showToast(error.message, "error"),
                })
            }
        } catch (error) {
            console.error("Failed to submit form", error)
        }
    }


    const handleErrorForm = (errors: FieldErrors<ReviewFormValues>) => {
        console.log("Form Errors: ", errors);
    }

    useEffect(() => {
        console.log("zReviewAEData: ", zReviewAEData);
        // Update form values when initialValues changes
        reset(zReviewAEData);

    }, [zReviewAEData]);

    return (
        <>
            <Dialog
                open={zIsOpenDialog2}
                onOpenChange={(open) => {
                    zSetIsOpenDialog2(open);
                    if (!open) {
                        zSetReviewId(0);
                        clearReviewAEData();
                    }
                }}
            >
                <DialogContent className="max-w-lg w-full">
                    <DialogHeader>
                        <DialogTitle>
                            {zIsCreateReview
                                ? CREATE_REVIEW
                                : EDIT_REVIEW}
                        </DialogTitle>
                        <DialogDescription>
                            {zIsCreateReview
                                ? "Fill in the details to add a new review."
                                : "Edit the review details below."}
                        </DialogDescription>
                    </DialogHeader>
                    <form
                        onSubmit={handleSubmit(handleSubmitForm, handleErrorForm)}
                        noValidate
                        className="space-y-3"
                    >
                        <Controller
                            name="rate"
                            control={control}
                            render={({ field }) => (
                                <div>
                                    <StarRating value={field.value} onChange={field.onChange} />
                                    {errors.rate && (
                                        <p className="text-red-500 text-sm">{errors.rate.message}</p>
                                    )}
                                </div>
                            )}
                        />

                        <div className="flex flex-col space-y-1">
                            <Label htmlFor="reviewDescription">Review Description</Label>
                            <textarea
                                id="reviewDescription"
                                placeholder="Write your review..."
                                {...register("reviewDescription")}
                                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                            />
                            {errors.reviewDescription && (
                                <p className="text-red-500 text-sm">{errors.reviewDescription.message}</p>
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
};

export default ReviewDialog
