const requestNotificationPermission = async (): Promise<"default" | "denied" | "granted"> => {


    return await Notification.requestPermission()



}

export default requestNotificationPermission