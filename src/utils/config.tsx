const config = {
    api: "https://campground-booking-backend-kq8e.vercel.app/api/v1",
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