/**
 * Extending base schema with custom pagination handler
 */
export default (schema) => {
    schema.query.paginate = async function (page, perPage = 10) {
        if (!page) page = 1;
        return await this.limit(perPage).skip(perPage * (page - 1));
    }
}