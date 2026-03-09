import { useLocalObservable } from "mobx-react-lite";
import { HubConnection, HubConnectionBuilder, HubConnectionState } from '@microsoft/signalr';
import { toast } from "react-toastify";
import { useEffect, useRef } from "react";
import { runInAction } from "mobx";

export const useComments = (activityId?: string) => {
    const hubConnected = useRef(false);

    const commentStore = useLocalObservable(() => ({
        // observables
        hubConnection: null as HubConnection | null,
        chatComments: [] as ChatComment[],
        //actions
        createHubConnection(activitId: string) {
            if (!activitId) {
                return;
            }

            this.hubConnection = new HubConnectionBuilder()
                .withUrl(`${import.meta.env.VITE_COMMENTS_URL}?activityId=${activitId}`, {
                    withCredentials: true
                })
                .withAutomaticReconnect()
                .build();

            this.hubConnection
                .start()
                .catch(error => {
                    toast.error("Error establishing connection. Activity comments is temporarily unavailable");
                    console.error("Error establishing connection", error);
                })
            this.hubConnection
                .on("LoadComments", comments => {
                    runInAction(() => {
                        this.chatComments = comments;
                    })
                })
            this.hubConnection
                .on("ReceiveComments", comment => {
                    runInAction(() => {
                        this.chatComments.unshift(comment);
                    })
                })
        },
        stopHubConnection() {
            if (this.hubConnection?.state === HubConnectionState.Connected) {
                this.hubConnection
                    .stop()
                    .catch(error => {
                        console.error("Error establishing connection", error);
                    })
            }
        }
    }));

    useEffect(() => {
        if (activityId && !hubConnected.current) {
            commentStore.createHubConnection(activityId);
            hubConnected.current = true;
        }

        return () => {
            commentStore.stopHubConnection();
            commentStore.chatComments = [];
        }
    }, [activityId])

    return {
        commentStore
    }
}