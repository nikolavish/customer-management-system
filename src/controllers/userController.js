export default {
    /**
     * GET `/users` - REST API
     * Returns a list of users (paginated)
     */
    getUsers: async (req, res) => {
        const page = req.body.page ?? 1;
        const perPage = req.body.perPage ?? 10;
        const users = res.locals.customer
            .getUsers()
            .select(['name', 'email'])
            .paginate(page,perPage);
        const total = await res.locals.customer.getUsers().countDocuments();

        return res.json({
            success: true,
            data: {
                users,
                pagination: {
                    currentPage: page,
                    totalUsers: total,
                    totalPages: Math.ceil(total / perPage)
                }
            }
        });
    }
}