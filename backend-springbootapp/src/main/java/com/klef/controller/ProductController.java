package com.klef.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.klef.entity.Product;
import com.klef.repository.ProductRepository;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/productapi")
public class ProductController 
{
	@Autowired
	private ProductRepository productRepository;
	
	@GetMapping("/")
	public String home()
	{
		return "Product API Demo ...";
	}

	@GetMapping("/all")
	public ResponseEntity<Map<String, Object>> getAllProducts() 
	{
	    List<Product> products = productRepository.findAll();
	    Map<String, Object> response = new HashMap<>();

	    if (products.isEmpty()) 
	    {
	        response.put("message", "Products Data Not Found");
	    } 
	    else 
	    {
	        response.put("products", products);
	    }

	    return ResponseEntity.ok(response);
	}


	@PostMapping("/add")
	public ResponseEntity<String> createProduct(@RequestBody Product product) 
	{
	    productRepository.save(product);
	    return ResponseEntity.status(HttpStatus.CREATED).body("Product Added Successfully");
	}


	@GetMapping("/get/{id}")
	public ResponseEntity<?> getProductById(@PathVariable Long id) 
	{
	    return productRepository.findById(id).<ResponseEntity<?>>map(ResponseEntity::ok).orElseGet(() -> ResponseEntity
	                    .status(HttpStatus.NOT_FOUND)
	                    .body("Product Not Found with ID: " + id));
	}


	@PutMapping("/update/{id}")
	public ResponseEntity<?> updateProduct(@PathVariable Long id, @RequestBody Product productDetails) 
	{
	    return productRepository.findById(id)
	            .map(existingProduct -> {
	                existingProduct.setName(productDetails.getName());
	                existingProduct.setDescription(productDetails.getDescription());
	                existingProduct.setPrice(productDetails.getPrice());
	                Product updated = productRepository.save(existingProduct);

	                Map<String, Object> response = new HashMap<>();
	                response.put("message", "Product updated successfully");
	                response.put("product", updated);

	                return ResponseEntity.ok(response);
	            })
	            .orElseGet(() -> {
	                Map<String, Object> errorResponse = new HashMap<>();
	                errorResponse.put("message", "Product not found with ID: " + id);
	                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorResponse);
	            });
	}


	@DeleteMapping("/delete/{id}")
	public ResponseEntity<String> deleteProduct(@PathVariable Long id) 
	{
	    if (productRepository.existsById(id)) 
	    {
	        productRepository.deleteById(id);
	        return ResponseEntity.ok(id + " - Product deleted successfully");
	    } 
	    else 
	    {
	        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Product not found with ID: " + id);
	    }
	}

}
