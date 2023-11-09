import customer from "../models/customer.js"

export default {
    /**
     * GET `/customers` - REST API
     * Returns a list of customers (paginated)
     */
    getCustomers: async (req, res) => {
        const page = req.body.page ?? 1;
        const perPage = req.body.perPage ?? 10;
        const data = await customer.find().select(['name', 'email']).paginate(page, perPage);
        const total = await customer.countDocuments();

        return res.json({
            success: true, data: {
                customers: data,
                pagination: {
                    currentPage: page,
                    totalCustomers: total,
                    totalPages: Math.ceil(total / perPage)
                }
            }
        });
    }
}