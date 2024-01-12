package com.example.taxemanagement.dto;

import com.example.taxemanagement.entity.TaxeTNB;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TaxeRequest {

    private TaxeTNB taxeTNB;
}
