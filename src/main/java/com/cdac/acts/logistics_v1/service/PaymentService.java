package com.cdac.acts.logistics_v1.service;

import com.cdac.acts.logistics_v1.model.Invoice;
import java.util.List;

public interface InvoiceService {
    Invoice generateInvoice(Invoice invoice);
    Invoice getInvoiceById(Long id);
    List<Invoice> getAllInvoices();
    Invoice updateInvoice(Long id, Invoice updatedInvoice);
    void deleteInvoice(Long id);
}
