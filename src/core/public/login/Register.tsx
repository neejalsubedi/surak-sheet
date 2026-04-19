import { useForm } from "react-hook-form";
import {
    createUserWithEmailAndPassword,
    updateProfile,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../../../utils/firebase";

import { useState } from "react";

import {
    User,
    AtSign,
    Mail,
    Phone,
    Lock,
    Eye,
    EyeOff,
    CalendarIcon,
} from "lucide-react";
import {AuthLayout} from "../../../components/AuthLayout.tsx";
import {Link, useNavigate} from "react-router-dom";
import {Input} from "../../../components/input.tsx";
import {Label} from "@radix-ui/react-label";
import Button from "../../../components/Button.tsx";


type RegisterFormValues = {
    fullName: string;
    email: string;
    username: string;
    dob: string;
    phone: string;
    password: string;
};

const Register = () => {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterFormValues>();

    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const onSubmit = async (data: RegisterFormValues) => {
        try {
            setLoading(true);

            const userCredential = await createUserWithEmailAndPassword(
                auth,
                data.email,
                data.password
            );

            const user = userCredential.user;

            await updateProfile(user, {
                displayName: data.fullName,
            });

            await setDoc(doc(db, "users", user.uid), {
                fullName: data.fullName,
                email: data.email,
                username: data.username,
                dob: data.dob,
                phone: data.phone,
                createdAt: new Date(),
            });

            navigate( "/login" );
        } catch (error) {
            console.error("Error registering user:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthLayout
            title="Create your account"
            subtitle="Start securing your documents today"
            nepaliSubtitle="आज नै आफ्ना कागजातहरू सुरक्षित गर्नुहोस्"
            footer={
                <span className="text-muted-foreground">
          Already registered?{" "}
                    <Link to="/login" className="text-primary font-semibold hover:underline">
            Sign in
          </Link>
        </span>
            }
        >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

                {/* Name + Username */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label className="text-sm font-medium">Full Name</Label>
                        <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <Input
                                {...register("fullName", { required: "Full name is required" })}
                                placeholder="Aayush Sharma"
                                className="pl-10 h-12 rounded-xl"
                            />
                        </div>
                        {errors.fullName && (
                            <p className="text-xs text-red-500">{errors.fullName.message}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label className="text-sm font-medium">Username</Label>
                        <div className="relative">
                            <AtSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <Input
                                {...register("username", { required: "Username is required" })}
                                placeholder="aayush_np"
                                className="pl-10 h-12 rounded-xl"
                            />
                        </div>
                        {errors.username && (
                            <p className="text-xs text-red-500">{errors.username.message}</p>
                        )}
                    </div>
                </div>

                {/* Email */}
                <div className="space-y-2">
                    <Label className="text-sm font-medium">Email Address</Label>
                    <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                            type="email"
                            {...register("email", { required: "Email is required" })}
                            placeholder="aayush@example.com"
                            className="pl-10 h-12 rounded-xl"
                        />
                    </div>
                    {errors.email && (
                        <p className="text-xs text-red-500">{errors.email.message}</p>
                    )}
                </div>

                {/* Phone + DOB */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                    {/* Phone */}
                    <div className="space-y-2">
                        <Label className="text-sm font-medium">Phone Number</Label>
                        <div className="relative">
                            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <div className="absolute left-9 top-1/2 -translate-y-1/2 text-sm text-muted-foreground border-r pr-2">
                                +977
                            </div>
                            <Input
                                {...register("phone", { required: "Phone is required" })}
                                placeholder="98XXXXXXXX"
                                className="pl-20 h-12 rounded-xl"
                            />
                        </div>
                        {errors.phone && (
                            <p className="text-xs text-red-500">{errors.phone.message}</p>
                        )}
                    </div>

                    {/* DOB */}
                    <div className="space-y-2">
                        <Label className="text-sm font-medium">Date of Birth</Label>
                        <div className="relative">
                            <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <Input
                                type="date"
                                {...register("dob", { required: "DOB is required" })}
                                className="pl-10 h-12 rounded-xl"
                            />
                        </div>
                        {errors.dob && (
                            <p className="text-xs text-red-500">{errors.dob.message}</p>
                        )}
                    </div>
                </div>

                {/* Password */}
                <div className="space-y-2">
                    <Label className="text-sm font-medium">Password</Label>
                    <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                            type={showPassword ? "text" : "password"}
                            {...register("password", {
                                required: "Password is required",
                                minLength: { value: 6, message: "Minimum 6 characters" },
                            })}
                            placeholder="At least 8 characters"
                            className="pl-10 pr-10 h-12 rounded-xl"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword((s) => !s)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                        >
                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                    </div>
                    {errors.password && (
                        <p className="text-xs text-red-500">{errors.password.message}</p>
                    )}
                    <p className="text-xs text-muted-foreground">
                        Use 8+ characters with letters & numbers
                    </p>
                </div>

                {/* Submit */}
                <Button
                    type="submit"
                    disabled={loading}
                    className="w-full h-12 rounded-xl text-base font-semibold mt-2"
                >
                    {loading ? "Creating account..." : "Create Account"}
                </Button>

                {/* Terms */}
                <p className="text-xs text-center text-muted-foreground leading-relaxed">
                    By signing up, you agree to our{" "}
                    <span className="text-primary font-medium">Terms</span> &{" "}
                    <span className="text-primary font-medium">Privacy Policy</span>
                </p>

            </form>
        </AuthLayout>
    );
};

export default Register;