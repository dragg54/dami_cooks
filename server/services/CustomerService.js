import { col, fn, literal, Op } from "sequelize";
import { Order } from "../models/Order.js";
import User from "../models/User.js";
import { getPagination, getPagingData } from "../utils/pagination.js";

export const getAllCustomers = async (req) => {
    const { page, size, status, searchText, name, email } = req.query;
    const { limit, offset } = getPagination(page, size);

    const queryOpts = { where: { isAdmin: false } }
    if (status != null) {
        queryOpts['where'] = { ...queryOpts.where, status: status.toUpperCase() }
    }

    if (email) {
        email['where'] = { email }
    }



    if (searchText) {
        queryOpts['where'] = {
            ...queryOpts['where'],
            [Op.or]: [
                literal(`LOWER(item.name) LIKE LOWER('%${searchText}%')`),
                literal(`LOWER(description) LIKE LOWER('%${searchText}%')`),
            ]
        }
    }

    if (name) {
        queryOpts.where = {
            ...queryOpts.where,
            [Op.or]: [
                {
                    firstName: { [Op.like]: `%${name}%` },
                    lastName: { [Op.like]: `%${name}%` }
                }
            ]
        }
    }

    const data = await Order.findAndCountAll({
        attributes: [
            [fn('COUNT', col('order.id')), 'totalOrders'],
            [fn('SUM', col('amount')), 'totalPayment']
        ],
        include: [
            {
                ...queryOpts,
                model: User,
                attributes: ["firstName", "lastName", "email", "phone", "address"]
            }
        ],
        group: ['userId'],
        limit,
        offset,
        order: [[literal('totalOrders'), 'DESC']]
    });

    return getPagingData(data, page, limit)
}