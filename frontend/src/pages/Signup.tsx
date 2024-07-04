import Button from '@tailus-ui/Button';
import { Text, Link, Caption, Title } from '@tailus-ui/typography';
import Input from '@tailus-ui/Input';
import Label from '@tailus-ui/Label';
import Card from '@tailus-ui/Card';
import BrandLogo from "../components/BrandLogo.tsx";

export function Signup() {
    return (
        <main className="z-10 m-auto max-w-lg px-6 py-6 sm:py-12 md:py-20 lg:absolute lg:inset-0 lg:m-auto lg:grid lg:max-w-5xl lg:grid-cols-2 lg:gap-16 lg:px-12 xl:gap-32 xl:px-0">
            <div className="py-6">

                <a href="/">
                    <BrandLogo/>
                </a>

                <div className="my-12 hidden space-y-6 lg:block">
                    <div className="grid gap-3 [grid-template-columns:auto_1fr]">
                        <div className="flex size-6 rounded-full border bg-[--ui-bg]">
                            <i className="fa-solid fa-check m-auto size-3 text-primary-600 dark:text-primary-400"></i>
                        </div>

                        <div className="space-y-2">
                            <Title as="span" size="base" weight="medium">
                                Get Started
                            </Title>
                            <Text size="sm">Join us and explore a world of opportunities. Sign up to get started with our platform.</Text>
                        </div>
                    </div>

                    <div className="grid gap-3 [grid-template-columns:auto_1fr]">
                        <div className="flex size-6 rounded-full border bg-[--ui-bg]">
                            <i className="fa-solid fa-check m-auto size-3 text-primary-600 dark:text-primary-400"></i>
                        </div>

                        <div className="space-y-2">
                            <Title as="span" size="base" weight="medium">
                                Start Building
                            </Title>
                            <Text size="sm">Create, manage, and track your tasks effortlessly. Build your projects with ease.</Text>
                        </div>
                    </div>

                    <div className="grid gap-3 [grid-template-columns:auto_1fr]">
                        <div className="flex size-6 rounded-full border bg-[--ui-bg]">
                            <i className="fa-solid fa-check m-auto size-3 text-primary-600 dark:text-primary-400"></i>
                        </div>

                        <div className="space-y-2">
                            <Title as="span" size="base" weight="medium">
                                Achieve More
                            </Title>
                            <Text size="sm">Unlock your potential and achieve your goals with our powerful tools and features.</Text>
                        </div>
                    </div>
                </div>

                <div data-shade="950" className="hidden border lg:block">
                    <div className="mx-auto max-w-xs p-6">
                        <Text align="center" size="sm">
                            "Great work on the Tailfolio template. This is one of the best personal websites that I have seen so far."
                        </Text>
                    </div>
                </div>
            </div>

            <Card className="relative h-fit p-1 shadow-xl shadow-gray-950/10 lg:mb-12" variant="mixed">
                <div data-rounded="large" className="p-10">
                    <div>
                        <Title size="xl" className="mb-1">
                            Welcome to TaskBite
                        </Title>

                        <Text className="my-0" size="sm">
                            Create an account to get started with TaskBite.
                        </Text>
                    </div>

                    <form className="mx-auto mt-8 space-y-6">
                        <div className="space-y-6 rounded-[--btn-radius] shadow-sm shadow-gray-500/5">
                            <div className="space-y-6">
                                <div className="grid gap-4 sm:grid-cols-2 sm:gap-3">
                                    <div className="space-y-2.5">
                                        <Label size="sm" htmlFor="firstname">
                                            First Name
                                        </Label>
                                        <Input id="firstname" name="firstname" type="text" required variant="outlined" size="md" />
                                    </div>

                                    <div className="space-y-2.5">
                                        <Label size="sm" htmlFor="lastname">
                                            Last Name
                                        </Label>
                                        <Input id="lastname" name="lastname" type="text" required variant="outlined" size="md" />
                                    </div>
                                </div>

                                <div className="space-y-2.5">
                                    <Label size="sm" htmlFor="email">
                                        Email
                                    </Label>
                                    <Input id="email" name="email" type="email" required variant="outlined" size="md" />
                                </div>

                                <div className="space-y-2.5">
                                    <Label size="sm" htmlFor="password">
                                        Password
                                    </Label>
                                    <Input id="password" name="password" type="password" required variant="outlined" size="md" />
                                </div>
                            </div>
                        </div>

                        <Button.Root className="w-full">
                            <Button.Label>Create Account</Button.Label>
                        </Button.Root>
                    </form>
                </div>

                <Card variant="soft" data-shade="925" className="rounded-[calc(var(--card-radius)-0.25rem)] dark:bg-[--ui-bg]">
                    <Caption className="my-0" size="sm" align="center">
                        Already have an account? {''}
                        <Link intent="neutral" size="sm" variant="underlined" href="">
                            Login
                        </Link>
                    </Caption>
                </Card>
            </Card>
        </main>
    );
}
