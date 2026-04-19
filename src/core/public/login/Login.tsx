
import { useState } from "react";
import { Mail, Lock, Eye, EyeOff,} from "lucide-react";




import { useForm } from "react-hook-form";
import { signInWithEmailAndPassword } from "firebase/auth";
import { collection, query, where, getDocs } from "firebase/firestore";
import { auth, db } from "../../../utils/firebase";
import {Link, useNavigate} from "react-router-dom";
import { AuthLayout } from "../../../components/AuthLayout";
import {Input} from "../../../components/input.tsx";
import Button from "../../../components/Button.tsx";
import {Label} from "../../../components/label.tsx";

type LoginFormValues = {
    identifier: string;
    password: string;
};



function Login() {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormValues>();

    const onSubmit = async (data: LoginFormValues) => {
        try {
            setLoading(true);

            let email = data.identifier;

            // username → email lookup
            if (!email.includes("@")) {
                const q = query(
                    collection(db, "users"),
                    where("username", "==", data.identifier)
                );

                const querySnapshot = await getDocs(q);

                if (querySnapshot.empty) {
                    throw new Error("Username not found");
                }

                email = querySnapshot.docs[0].data().email;
            }

            await signInWithEmailAndPassword(auth, email, data.password);

            navigate( "/dashboard" );

        } catch (error: any) {

            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthLayout
            title="Welcome back"
            subtitle="Sign in to continue managing your documents"
            nepaliSubtitle="आफ्ना कागजातहरूमा फिर्ता आउनुभयो"
            footer={
                <span className="text-muted-foreground">
          New here?{" "}
                    <Link to="/register" className="text-primary font-semibold hover:underline">
            Create an account
          </Link>
        </span>
            }
        >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

                {/* Email / Username */}
                <div className="space-y-2">
                    <Label className="text-sm font-medium">Email or Username</Label>
                    <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                            {...register("identifier", { required: "Required" })}
                            placeholder="aayush@example.com"
                            className="pl-10 h-12 rounded-xl"
                        />
                    </div>
                    {errors.identifier && (
                        <p className="text-xs text-red-500">{errors.identifier.message}</p>
                    )}
                </div>

                {/* Password */}
                <div className="space-y-2">
                    <div className="flex items-center justify-between">
                        <Label className="text-sm font-medium">Password</Label>
                        <Link to="/forgot-password" className="text-xs font-semibold text-primary hover:underline">
                            Forgot?
                        </Link>
                    </div>

                    <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                            type={showPassword ? "text" : "password"}
                            {...register("password", { required: "Password is required" })}
                            placeholder="Enter your password"
                            className="pl-10 pr-10 h-12 rounded-xl"
                        />

                        <button
                            type="button"
                            onClick={() => setShowPassword((s) => !s)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                        >
                            {showPassword ? (
                                <EyeOff className="w-4 h-4" />
                            ) : (
                                <Eye className="w-4 h-4" />
                            )}
                        </button>
                    </div>

                    {errors.password && (
                        <p className="text-xs text-red-500">{errors.password.message}</p>
                    )}
                </div>

                {/* Remember */}
                <label className="flex items-center gap-2 text-xs text-muted-foreground">
                    <input type="checkbox" className="w-4 h-4 accent-primary rounded" defaultChecked />
                    Keep me signed in for 30 days
                </label>

                {/* Submit */}
                <Button
                    type="submit"
                    disabled={loading}
                    className="w-full h-12 rounded-xl text-base font-semibold mt-2"
                >
                    {loading ? "Signing in..." : "Sign In"}
                </Button>

                {/* Divider */}
                <div className="relative my-4">
                    <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t border-border" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase tracking-wider">
                        <span className="bg-background px-2 text-muted-foreground">or</span>
                    </div>
                </div>




            </form>
        </AuthLayout>
    );
}

export default Login;