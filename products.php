<?php
require_once 'config/database.php';

class Product {
    private $conn;
    private $table_name = "products";

    public function __construct($db) {
        $this->conn = $db;
    }

    // Get all products
    public function getProducts() {
        $query = "SELECT p.*, c.name as category_name 
                 FROM " . $this->table_name . " p
                 LEFT JOIN categories c ON p.category_id = c.category_id
                 ORDER BY p.created_at DESC";
        
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        
        return $stmt;
    }

    // Get product by ID
    public function getProductById($id) {
        $query = "SELECT p.*, c.name as category_name 
                 FROM " . $this->table_name . " p
                 LEFT JOIN categories c ON p.category_id = c.category_id
                 WHERE p.product_id = ?";
        
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $id);
        $stmt->execute();
        
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    // Add more methods as needed for CRUD operations
}
?> 