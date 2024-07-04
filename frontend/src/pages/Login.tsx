import Button from '@tailus-ui/Button';
import { Text, Link, Caption, Title } from '@tailus-ui/typography';
import Input from '@tailus-ui/Input';
import Label from '@tailus-ui/Label';
import Separator from '@tailus-ui/Separator';
import BrandLogo from "../components/BrandLogo.tsx";

export function Login() {
    return (
        <main className="inset-0 z-10 m-auto h-fit px-6 py-24 lg:absolute lg:w-screen lg:max-w-full lg:px-0 lg:py-12">
            <div className="mx-auto max-w-sm">
                <div>
                    <div>
                        <a href="/">
                            <BrandLogo/>
                        </a>

                        <Title size="2xl" className="mb-1 mt-12">
                            Sign In to TaskBite
                        </Title>

                        <Text className="my-0" size="sm">
                            Welcome back! Sign in to continue
                        </Text>
                    </div>

                    <form className="mx-auto my-8 space-y-6">
                        <div className="space-y-6 rounded-[--btn-radius] shadow-sm shadow-gray-500/5">
                            <div className="space-y-4">
                                <div className="relative">
                                    <Label size="sm" htmlFor="email" className="sr-only">
                                        Your email
                                    </Label>
                                    <Input id="email" name="email" type="email" required size="xl" variant="soft" placeholder="Your email" className="rounded-[calc(var(--btn-radius)+6px)] pr-20" />
                                    <Button.Root intent="neutral" className="absolute inset-y-1.5 right-1.5">
                                        <Button.Label>Next</Button.Label>
                                    </Button.Root>
                                </div>
                            </div>
                        </div>
                    </form>

                    <Caption className="my-0" size="sm">
                        Don't have an account ? {' '}
                        <Link intent="neutral" size="sm" variant="underlined" href="">
                            Create account
                        </Link>
                    </Caption>

                    <Separator fancy className="mb-6 mt-36 md:mt-40 lg:mt-24" />

                    <Caption>By proceeding, you consent to get calls, WhatsApp or SMS messages, including by automated means, from Tailus and its affiliates to the number provided.</Caption>
                </div>
            </div>
        </main>
    );
}
