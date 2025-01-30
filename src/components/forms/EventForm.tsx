"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { getDatabase, ref, get, set } from "firebase/database";
import { toast } from "react-hot-toast";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import InputField from "../InputField";

const schema = z.object({
    title: z.string().min(1, { message: "Title is required!" }),
    class: z.string().min(1, { message: "Class is required!" }),
    date: z.string().min(1, { message: "Date is required!" }),
    startTime: z.string().min(1, { message: "Start Time is required!" }),
    endTime: z.string().min(1, { message: "End Time is required!" }),
    location: z.string().min(1, { message: "Location is required!" }),
});

type Inputs = z.infer<typeof schema>;

const EventForm = ({
    type,
    data,
}: {
    type: "create" | "update";
    data?: any;
}) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>({
        resolver: zodResolver(schema),
        defaultValues: data,
    });
    const [loading, setLoading] = useState(false);

    const onSubmit = handleSubmit(async (formData) => {
        const db = getDatabase();
        setLoading(true);

        try {
            let eventId = data?.id;
            if (type === "create") {
                const eventsRef = ref(db, "eventsData");
                const snapshot = await get(eventsRef);
                const events = snapshot.val();
                const ids = events ? Object.keys(events).map(Number) : [];
                eventId = ids.length > 0 ? Math.max(...ids) + 1 : 1;
            }

            const eventRef = ref(db, `eventsData/${eventId}`);
            await set(eventRef, {
                id: eventId,
                title: formData.title,
                class: formData.class,
                date: formData.date,
                startTime: formData.startTime,
                endTime: formData.endTime,
                location: formData.location,
            });

            toast.success(`Event ${type === "create" ? "created" : "updated"} successfully`);
        } catch (error) {
            toast.error(`Error ${type === "create" ? "creating" : "updating"} event: ${(error as any).message}`);
        } finally {
            setLoading(false);
        }
    });

    return (
        <form className="flex flex-col gap-8" onSubmit={onSubmit}>
            <InputField
                label="Title"
                name="title"
                register={register}
                error={errors?.title}
            />
            <InputField
                label="Class"
                name="class"
                register={register}
                error={errors?.class}
            />
            <InputField
                label="Date"
                name="date"
                type="date"
                register={register}
                error={errors?.date}
            />
            <InputField
                label="Start Time"
                name="startTime"
                type="time"
                register={register}
                error={errors?.startTime}
            />
            <InputField
                label="End Time"
                name="endTime"
                type="time"
                register={register}
                error={errors?.endTime}
            />
            <InputField
                label="Location"
                name="location"
                register={register}
                error={errors?.location}
            />
            <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-4 rounded-md border-none w-max self-center hover:bg-blue-600 duration-150"
                disabled={loading}
            >
                {loading ? "Submitting..." : type === "create" ? "Create Event" : "Update Event"}
            </button>
            <p className="text-xs text-gray-500">*Please note that the created event cannot be deleted to prevent impulsive deletion</p>
        </form>
    );
};

export default EventForm;
