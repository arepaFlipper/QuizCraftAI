import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import SignInButton from "@/components/SignInButton";
import { redirect } from "next/navigation";
import { getAuthSession } from "@/lib/nextauth";

const Home = async () => {
  const session = await getAuthSession();
  if (session?.user) {
    return redirect("/dashboard");
  }
  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <Card className="w-[300px]">
        <CardHeader>
          <CardTitle>Welcome to Quiz Craft AI!</CardTitle>
          <CardDescription>
            Quiz Craft AI is a web application that allows you to create and
            share quizzes with your friends.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SignInButton text="Sign In with Google!" />
        </CardContent>
      </Card>
    </div>
  );
};

export default Home;
