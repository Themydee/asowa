  import { useState } from "react";
  import { Link } from "react-router-dom";
  import { motion } from "framer-motion";
  import { Eye, EyeOff, Mail, Lock, Chrome } from "lucide-react";
  import { Button } from "@/components/ui/button";
  import { Input } from "@/components/ui/input";
  import { Label } from "@/components/ui/label";
  import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
  import { Checkbox } from "@/components/ui/checkbox";
  import { loginUser } from "@/services/api";
  import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";


  type LoginResponse = {
    success: boolean;
    user: {
      id: number;
      fullname: string;
      email: string;
      role: "user" | "admin";
    };
    token: string;
    message?: string;
  };

  export default function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setError(null);

      try {
        const res = await loginUser({ email, password });
        if (!res.success) {
          setError(res.message || "Invalid credentials");
          return;
        }

         login({ ...res.user, id: Number(res.user.id), fullname: String(res.user.fullname), email: String(res.user.email) }, res.token); 

      
        if (res.user.role.toLowerCase() === "admin") {
          navigate("/admin");

        } else {
          navigate("/dashboard");
        }
      } catch (err) {
        console.error(err);
        setError("Something went wrong. Please try again.");
      }
    };

    return (
      <div className="min-h-screen flex">
        {/* Left Side - Form */}
        <div className="flex-1 flex items-center justify-center p-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="w-full max-w-md"
          >
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2 mb-8">
              
              <span className="font-bold text-xl text-foreground">
                A'sowa
              </span>
            </Link>

            <Card variant="elevated" className="border-0">
              <CardHeader className="space-y-1">
                <CardTitle className="text-2xl">Welcome back</CardTitle>
                <CardDescription>
                  Enter your credentials to access your account
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Email */}
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="name@example.com"
                        className="pl-10"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  {/* Password */}
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label htmlFor="password">Password</Label>
                      <Link
                        to="/forgot-password"
                        className="text-sm text-primary hover:underline"
                      >
                        Forgot password?
                      </Link>
                    </div>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        className="pl-10 pr-10"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Remember Me */}
                  <div className="flex items-center space-x-2">
                    <Checkbox id="remember" />
                    <label
                      htmlFor="remember"
                      className="text-sm text-muted-foreground cursor-pointer"
                    >
                      Remember me for 30 days
                    </label>
                  </div>

                  {/* Submit */}
                  <Button type="submit" className="w-full" size="lg">
                    Sign In
                  </Button>

                  {/* Divider */}
                  <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-border" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-card px-2 text-muted-foreground">
                        Or continue with
                      </span>
                    </div>
                  </div>

                  {/* Social Login */}
                  <div className="grid grid-cols-2 gap-4">
                    <Button variant="outline" type="button">
                      <Chrome className="h-4 w-4 mr-2" />
                      Google
                    </Button>
                    <Button variant="outline" type="button">
                      <svg
                        className="h-4 w-4 mr-2"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                      </svg>
                      GitHub
                    </Button>
                  </div>
                </form>

                {/* Sign Up Link */}
                <p className="text-center text-sm text-muted-foreground mt-6">
                  Don't have an account?{" "}
                  <Link
                    to="/register"
                    className="text-primary hover:underline font-medium"
                  >
                    Sign up
                  </Link>
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Right Side - Image */}
        <div className="hidden lg:flex flex-1 bg-primary relative overflow-hidden">
          <div className="absolute inset-0 pattern-textile opacity-10" />
          <div className="absolute inset-0 bg-gradient-to-br from-primary to-blue-glow" />
          <div className="relative z-10 flex items-center justify-center p-12">
            <div className="text-center text-primary-foreground max-w-md">
              <h2 className="text-3xl font-bold mb-4">
                Join Our Creative Community
              </h2>
              <p className="text-primary-foreground/80 mb-8">
                Access thousands of premium textile designs or share your own
                creations with designers worldwide.
              </p>
              <div className="flex justify-center gap-4">
                <div className="text-center">
                  <div className="text-4xl font-bold">50K+</div>
                  <div className="text-sm text-primary-foreground/70">
                    Designs
                  </div>
                </div>
                <div className="w-px bg-primary-foreground/20" />
                <div className="text-center">
                  <div className="text-4xl font-bold">12K+</div>
                  <div className="text-sm text-primary-foreground/70">
                    Artists
                  </div>
                </div>
                <div className="w-px bg-primary-foreground/20" />
                <div className="text-center">
                  <div className="text-4xl font-bold">99%</div>
                  <div className="text-sm text-primary-foreground/70">
                    Satisfaction
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
