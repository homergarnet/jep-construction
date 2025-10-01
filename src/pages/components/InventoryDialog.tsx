import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import React from 'react'
import { Controller, FormProvider, type useForm } from 'react-hook-form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CLIENT_TYPE, CREATE_INVENTORY, EDIT_INVENTORY } from '@/constants/constants';
import type { InventoryFormValues } from '../schema/inventoryFormSchema';
import useInventoryContext from '@/store/inventory/inventoryContext';
import { useGetEmployeeList } from '@/hooks/useEmployeeList';



interface InventoryDialogProps {
    onClientNameChange: (userId: string) => void;
    onCategoryChange: (category: string) => void;
    onSubmit: (data: InventoryFormValues) => void;
    onError?: (error: any) => void;
    onReset: () => void;
    formMethods: ReturnType<typeof useForm<InventoryFormValues>>;
}

const InventoryDialog: React.FC<InventoryDialogProps> = ({
    onClientNameChange,
    onCategoryChange,
    onSubmit,
    onError,
    onReset,
    formMethods,
}) => {

    const { data: clientList, isLoading: empListLoading } = useGetEmployeeList({
        keyword: "",
        accountType: CLIENT_TYPE,
        page: 1,
        pageSize: 10000,
    });

    const zIsOpenDialog = useInventoryContext(
        (state) => state.zIsOpenDialog
    );
    const zSetIsOpenDialog = useInventoryContext(
        (state) => state.zSetIsOpenDialog
    );
    const zDialogTitle = useInventoryContext((state) => state.zDialogTitle);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        control,
    } = formMethods;

    return (
        <Dialog
            open={zIsOpenDialog}
            onOpenChange={(open) => {
                zSetIsOpenDialog(open);
                if (!open) {
                    reset(); // clears form
                    onReset(); // external reset callback
                }
            }}
        >
            <DialogContent className="max-w-lg w-full">
                <DialogHeader>
                    <DialogTitle>
                        {zDialogTitle === CREATE_INVENTORY
                            ? CREATE_INVENTORY
                            : EDIT_INVENTORY}
                    </DialogTitle>
                    <DialogDescription>
                        {zDialogTitle === CREATE_INVENTORY
                            ? "Fill in the details to add a new inventory."
                            : "Edit the inventory details below."}
                    </DialogDescription>
                </DialogHeader>

                <FormProvider {...formMethods}>
                    <form
                        onSubmit={handleSubmit(onSubmit, onError)}
                        noValidate
                        className="space-y-3"
                    >
                        {/* ✅ UserId Select */}
                        <div className="flex flex-col space-y-1 w-full">
                            <label className="text-sm font-medium">Client Name</label>
                            <Controller
                                name="userId"
                                control={control}
                                render={({ field }) => (
                                    <Select
                                        value={field.value?.toString() ?? ""}
                                        onValueChange={(val) => {
                                            field.onChange(val); // update form state
                                            onClientNameChange(val); // notify parent
                                        }}
                                    >
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Select client" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {clientList && clientList.UserList.map((client) => (
                                                <SelectItem
                                                    key={client.Id}
                                                    value={client.Id.toString()}
                                                >
                                                    {client.Firstname} {client.Lastname} {/* or Firstname + Lastname if separate */}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                )}
                            />
                            {errors.userId && (
                                <p className="text-red-500 text-sm">
                                    {errors.userId.message}
                                </p>
                            )}
                        </div>

                        <Input placeholder="Item name" {...register("itemName")} />
                        {errors.itemName && (
                            <p className="text-red-500 text-sm">
                                {errors.itemName.message}
                            </p>
                        )}

                        {/* ✅ Category Select */}
                        <div className="flex flex-col space-y-1 w-full">
                            <label className="text-sm font-medium">Category</label>
                            <Controller
                                name="category"
                                control={control}
                                render={({ field }) => (
                                    <Select
                                        value={field.value?.toString() ?? ""}
                                        onValueChange={(val) => {
                                            field.onChange(val); // update form state
                                            onCategoryChange(val); // notify parent
                                        }}
                                    >
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Select category" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem
                                                key="raw materials"
                                                value="raw materials"
                                            >
                                                Raw Materials
                                            </SelectItem>
                                            <SelectItem
                                                key="finishing materials"
                                                value="finishing materials"
                                            >
                                                Finishing Materials
                                            </SelectItem>
                                            <SelectItem
                                                key="concrete & masonry"
                                                value="concrete & masonry"
                                            >
                                                Concrete & Masonry
                                            </SelectItem>
                                            <SelectItem
                                                key="plumbing & electrical"
                                                value="plumbing & electrical"
                                            >
                                                Plumbing & Electrical
                                            </SelectItem>
                                            <SelectItem
                                                key="metal sheets & plates"
                                                value="metal sheets & plates"
                                            >
                                                Metal Sheets & Plates
                                            </SelectItem>
                                            <SelectItem
                                                key="pipes & tubes"
                                                value="pipes & tubes"
                                            >
                                                Pipes & Tubes
                                            </SelectItem>
                                            <SelectItem
                                                key="welding supplies"
                                                value="welding supplies"
                                            >
                                                Welding Supplies
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                )}
                            />
                            {errors.category && (
                                <p className="text-red-500 text-sm">
                                    {errors.category.message}
                                </p>
                            )}
                        </div>

                        <Input
                            type="number"
                            placeholder="Quantity"
                            {...register("quantity", { valueAsNumber: true })}
                        />

                        <Input placeholder="Unit of Measure" {...register("unitOfMeasure")} />
                        {errors.unitOfMeasure && (
                            <p className="text-red-500 text-sm">
                                {errors.unitOfMeasure.message}
                            </p>
                        )}

                        <Input
                            type="number"
                            placeholder="RE-Order Level"
                            {...register("reOrderLevel", { valueAsNumber: true })}
                        />

                        <Input
                            type="number"
                            placeholder="RE-Order Quantity"
                            {...register("reOrderQuantity", { valueAsNumber: true })}
                        />

                        <textarea
                            placeholder="Description"
                            {...register("description")}
                            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                        />
                        {errors.description && (
                            <p className="text-red-500 text-sm">
                                {errors.description.message}
                            </p>
                        )}

                        <Button type="submit" className="w-full cursor-pointer">
                            Save
                        </Button>
                    </form>
                </FormProvider>
            </DialogContent>
        </Dialog>
    );
};

export default InventoryDialog
