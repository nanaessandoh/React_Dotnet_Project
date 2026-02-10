import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { LoginSchema } from "../schemas/loginSchema";
import agent from "../api/agent";
import { useNavigate } from "react-router";
import { RegisterSchema } from "../schemas/registerSchema";
import { toast } from "react-toastify";

export const useUser = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const loginUser = useMutation({
        mutationFn: async (creds: LoginSchema) => {
            await agent.post('/login?useCookies=true', creds);
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['user'] });
        }
    });

    const logoutUser = useMutation({
        mutationFn: async () => {
            await agent.post('/users/logout');
        },
        onSuccess: async () => {
            queryClient.removeQueries({ queryKey: ['user'] });
            queryClient.removeQueries({ queryKey: ['activities'] });
            await navigate('/');
        }
    });

    const { data: currentUser, isLoading: loadingUserInfo } = useQuery({
        queryKey: ['user'],
        queryFn: async () => {
            const response = await agent.get<User>('/users/user-info');
            return response.data;
        },
        enabled: !queryClient.getQueryData(['user']),
    });

    const registerUser = useMutation({
        mutationFn: async (creds: RegisterSchema) => {
            await agent.post('/users/register', creds);
        },
        onSuccess: async () => {
            toast.success('Registration successful! Please login.');
            await navigate('/login');
        }
    });

    return {
        loginUser,
        logoutUser,
        currentUser,
        registerUser,
        loadingUserInfo
    };
}