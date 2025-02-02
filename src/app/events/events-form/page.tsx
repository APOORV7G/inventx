"use client";
import {
    useState
} from "react";
import {
    toast
} from "sonner";
import {
    useForm
} from "react-hook-form";
import {
    zodResolver
} from "@hookform/resolvers/zod";
import * as z from "zod";
import {
    cn
} from "@/lib/utils";
import {
    Button
} from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    Input
} from "@/components/ui/input";
import {
    DatetimePicker
} from "@/components/ui/datetime-picker";
import { createEvent } from '@/features/events/api/eventsForm';
import { useUser } from '@clerk/nextjs';

const formSchema = z.object( {
    eventName: z.string().min( 1, "Event name is required" ),
    eventDescription: z.string().min( 1, "Description is required" ),
    startDate: z.coerce.date(),
    endDate: z.coerce.date(),
} ).refine( ( data ) => data.endDate > new Date(), {
    message: "End date must be in the future",
    path: ["endDate"]
} ).refine( ( data ) => data.endDate > data.startDate, {
    message: "End date must be after start date",
    path: ["endDate"]
} );

export default function MyForm () {
    const form = useForm<z.infer<typeof formSchema>>( {
        resolver: zodResolver( formSchema ),
        defaultValues: {
            eventName: "",
            eventDescription: "",
            startDate: new Date(),
            endDate: new Date()
        },
    } );

    const { user } = useUser();
    async function onSubmit ( values: z.infer<typeof formSchema> ) {
        try {
            console.log( values );
            toast(
                <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                    <code className="text-white">{JSON.stringify( values, null, 2 )}</code>
                </pre>
            );
            const insertValues = {
                userId: user?.id || '',
                eventName: values.eventName,
                eventDescription: values.eventDescription,
                startDate: values.startDate,
                endDate: values.endDate
            };
            await createEvent( insertValues );
        } catch ( error ) {
            console.error( "Form submission error", error );
            toast.error( "Failed to submit the form. Please try again." );
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit( onSubmit )} className="space-y-8 max-w-3xl mx-auto py-10">
                <FormField
                    control={form.control}
                    name="eventName"
                    render={( { field } ) => (
                        <FormItem>
                            <FormLabel>Event Name</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="event"

                                    type="text"
                                    {...field} />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="eventDescription"
                    render={( { field } ) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Nothing..."

                                    type="text"
                                    {...field} />
                            </FormControl>
                            <FormDescription>What is your event about?</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="grid grid-cols-12 gap-4">

                    <div className="col-span-6">

                        <FormField
                            control={form.control}
                            name="startDate"
                            render={( { field } ) => (
                                <FormItem className="flex flex-col">
                                    <FormLabel>Start Date</FormLabel>
                                    <DatetimePicker
                                        {...field}
                                        format={[
                                            ["months", "days", "years"],
                                            ["hours", "minutes", "am/pm"],
                                        ]}
                                    />

                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="col-span-6">

                        <FormField
                            control={form.control}
                            name="endDate"
                            render={( { field } ) => (
                                <FormItem className="flex flex-col">
                                    <FormLabel>End Date</FormLabel>
                                    <DatetimePicker
                                        {...field}
                                        format={[
                                            ["months", "days", "years"],
                                            ["hours", "minutes", "am/pm"],
                                        ]}
                                    />
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                </div>
                <Button type="submit">Submit</Button>
            </form>
        </Form>
    );
}
