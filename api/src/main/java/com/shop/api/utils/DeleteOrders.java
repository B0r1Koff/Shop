package com.shop.api.utils;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;

public class DeleteOrders {
    @PersistenceContext
    private EntityManager entityManager;

    @Transactional
    public void deleteByNumber(int number) {
        entityManager.createQuery("DELETE FROM Orders e WHERE e.number = :number")
                .setParameter("number", number)
                .executeUpdate();
    }
}
