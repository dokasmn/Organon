// HOOKS
import { useLoading } from '../contexts/LoadingContext';
import { usePopupLog } from '../contexts/PopUpLogContext';
import { useAuth } from '../contexts/AuthContext';


const useRequests = () => {
    const { setShowLoading } = useLoading();
    const { handleShowError } = usePopupLog();
    const { logout, user } = useAuth();

    const showError = (error: any) => {
        setShowLoading(false);
        if(error.response?.data?.detail){
            const detail = error.response.data.detail;
            if(detail === "Token inválido."){
                logout();
                return
            }
            handleShowError(error.response.data.detail);
            return
        }
        handleShowError(`Algo deu errado ${ error.response ? `- ${error.response.status}` : '' }`);
        console.error('Error:', error.message);
    }

    const showUnespectedResponse = (response: any) => {
        handleShowError(`Resposta inesperada - ${response.status}`)
        console.error('Unexpected response status:', response.status);
    }

    const headersJsonToken = {
        'Authorization': `Token ${user.token}`,
        'Content-Type': 'application/json'
    }

    return {
        showError,
        showUnespectedResponse,
        headersJsonToken
    }
};

export default useRequests;