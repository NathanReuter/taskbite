import Card from '@tailus-ui/Card';
import Button from '@tailus-ui/Button';
import { Text, Link, Caption, Title } from '@tailus-ui/typography';
import Input from '@tailus-ui/Input';
import Label from '@tailus-ui/Label';
import BrandLogo from "../components/BrandLogo.tsx";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {useAppDispatch} from "../hooks.ts";
import {loginReducer} from "../store/userSlice.ts";

export function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    async function handleLogin(event: { preventDefault: () => void; }) {
        event.preventDefault();
        const result = await dispatch(loginReducer({email, password}))
        if (loginReducer.fulfilled.match(result)) {
            navigate('/dashboard')
        } else {
            alert(result.payload || 'Login Failed')
        }
    }

    return (
        <main className="inset-0 z-10 m-auto h-fit max-w-md px-6 py-12 lg:absolute">
            <Card className="relative h-fit p-1 shadow-xl shadow-gray-950/10" variant="mixed">
                <div data-rounded="large" className="p-10">
                    <BrandLogo></BrandLogo>
                    <div className='mt-2'>
                        <Title size="xl" className="mb-1">
                            Sign In to TaskBite
                        </Title>
                        <Text className="my-0" size="sm">
                            Welcome back! Sign in to continue
                        </Text>
                    </div>

                    <form onSubmit={event => handleLogin(event)} className="mx-auto mt-8 space-y-6">
                        <div className="space-y-6 rounded-[--btn-radius] shadow-sm shadow-gray-500/5">
                            <div className="space-y-6">
                                <div className="space-y-2.5">
                                    <Label size="sm" htmlFor="email">
                                        Your email
                                    </Label>
                                    <Input
                                        value={email}
                                        onChange={e => setEmail(e.target.value)}
                                        id="email" name="email" type="email" required variant="outlined" size="md" />
                                </div>
                                <div className="space-y-2.5">
                                    <div className="flex items-center justify-between">
                                        <Label size="sm" htmlFor="password">
                                            Password
                                        </Label>
                                        <Link href="#" size="sm">
                                            Forgot your Password ?
                                        </Link>
                                    </div>
                                    <Input
                                        value={password}
                                        onChange={e => setPassword(e.target.value)}
                                        id="password" name="password" type="password" required variant="outlined" size="md" />
                                </div>
                            </div>
                        </div>

                        <Button.Root className="w-full">
                            <Button.Label>Sign In</Button.Label>
                        </Button.Root>
                    </form>
                </div>

                <Card variant="soft" data-shade="925" className="rounded-[calc(var(--card-radius)-0.25rem)] dark:bg-gray-925">
                    <Caption className="my-0" size="sm" align="center">
                        Don't have an account ?{' '}
                        <Link intent="neutral" size="sm" variant="underlined" href="/signup">
                            Create account
                        </Link>
                    </Caption>
                </Card>
            </Card>
        </main>
    );
}
