const config = {
    api: "https://campground-booking-backend-api.vercel.app/api",
    tokenName: 'token',
    headers: () => {
        return {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }
    }
}

export default config