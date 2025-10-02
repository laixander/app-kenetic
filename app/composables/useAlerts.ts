// import colors from "#tailwind-config/theme/colors"
// import UIcolors from '#ui-colors'

export type NotificationColor = 'gray' 
export const useAlerts = () => {

    const toast = useToast()

    const constructErrorMessage = (error:any)=>{
        console.log('error.value :>>', error.value)
        console.log('error.data :>>', error.data)
        let errorMessage: string = '' + error.value
        if (error.value && error.value.data) {
            errorMessage = `${error.value.data.error} - ${error.value.data.errorMessage}`
        }else if (error.data){
            errorMessage = `${error.data.error} - ${error.data.errorMessage}`
        }else if(error.message){
            errorMessage = error.message
        }
        return errorMessage;
    }

    

    return {
        createErrorNotification (error:any, title?:string) {
            toast.add({
                color:"red",
                // timeout: 3000,
                icon:'i-icon-park-outline-error-computer',
                title:title?title:'Error on processing your request.',
                description: constructErrorMessage(error)
            })
        },
        createSuccessNotification (title?:string, description?:string) {
            toast.add({
                color:"primary",
                // timeout: 3000,
                icon:'i-icon-park-outline-database-success',
                title:title?title:'Success!',
                description: description?description:'Saving record was successful.'
            })
        },

        createDeleteNotification (title?:string, description?:string) {
            toast.add({
                color:"orange",
                // timeout: 3000,
                icon:'i-heroicons-archive-box-20-solid',
                title:title?title:'Success!',
                description: description?description:'Record was archived successfully.'
            })
        },

        createNotification (title:string, description:string, timeout:number=6000, icon?:string, color?:string) {
            // const selection = colors[color as keyof typeof colors]
            toast.add({
                color:'blue',
                // timeout: timeout,
                icon:icon?icon:'i-icon-park-outline-database-success',
                title:title?title:'Success!',
                description: description?description:'Saving record(s) was successful.'
            })
        }

    }
}