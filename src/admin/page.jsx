"use client";
import { auth, db, storage } from "@/lib/firebase";
import { addDoc, collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import * as XLSX from 'xlsx';
import Image from "next/image";
import { 
  Sparkles, 
  Heart, 
  Star, 
  Gift, 
  Crown, 
  Gem, 
  Palette,
  Wand2,
  Upload,
  FileSpreadsheet,
  ImagePlus
} from "lucide-react";

// Icon options for products
const PRODUCT_ICONS = [
  { id: "sparkles", icon: Sparkles, label: "Sparkles" },
  { id: "heart", icon: Heart, label: "Heart" },
  { id: "star", icon: Star, label: "Star" },
  { id: "gift", icon: Gift, label: "Gift" },
  { id: "crown", icon: Crown, label: "Crown" },
  { id: "gem", icon: Gem, label: "Gem" },
  { id: "palette", icon: Palette, label: "Palette" },
  { id: "wand", icon: Wand2, label: "Wand" },
];

export default function Admin() {
  // Single product form states
  const [file, setFile] = useState(null);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [desc, setDesc] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState("");
  const [selectedIcon, setSelectedIcon] = useState("sparkles");
  const [loading, setLoading] = useState(false);
  
  // NEW: Local image path option
  const [useLocalImage, setUseLocalImage] = useState(false);
  const [localImagePath, setLocalImagePath] = useState("");

  // Excel import states
  const [excelFile, setExcelFile] = useState(null);
  const [excelData, setExcelData] = useState([]);
  const [importLoading, setImportLoading] = useState(false);

  // Product list states
  const [products, setProducts] = useState([]);
  const [showProducts, setShowProducts] = useState(false);

  // Tab state
  const [activeTab, setActiveTab] = useState("single");

  // Load existing products
  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const snapshot = await getDocs(collection(db, "products"));
      const prods = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProducts(prods);
    } catch (error) {
      console.error("Error loading products:", error);
    }
  };

  // Single product upload
  const uploadSingleProduct = async () => {
    if (!auth.currentUser) {
      alert("Please login first");
      return;
    }

    if (!name || !price || !desc) {
      alert("Please fill in all required fields");
      return;
    }

    setLoading(true);

    try {
      let imageUrl = null;

      // Check if using local image path or uploading to Storage
      if (useLocalImage && localImagePath) {
        // Use local image path (e.g., "/charms/blossom.jpg")
        imageUrl = localImagePath;
      } else if (file) {
        // Upload to Firebase Storage
        const storageRef = ref(storage, `products/${Date.now()}_${file.name}`);
        await uploadBytes(storageRef, file);
        imageUrl = await getDownloadURL(storageRef);
      }

      await addDoc(collection(db, "products"), {
        name,
        price: parseFloat(price),
        description: desc,
        category: category || "Charms",
        stock: stock ? parseInt(stock) : 0,
        icon: selectedIcon,
        images: imageUrl ? [imageUrl] : [],
        createdAt: new Date(),
        createdBy: auth.currentUser.uid,
      });

      alert("Product added successfully! ✨");
      
      // Reset form
      setName("");
      setPrice("");
      setDesc("");
      setCategory("");
      setStock("");
      setFile(null);
      setLocalImagePath("");
      setSelectedIcon("sparkles");
      
      loadProducts();
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Failed to add product. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Handle Excel file selection
  const handleExcelFile = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setExcelFile(selectedFile);
      readExcelFile(selectedFile);
    }
  };

  // Read Excel file
  const readExcelFile = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = XLSX.utils.sheet_to_json(firstSheet);
        setExcelData(jsonData);
      } catch (error) {
        alert("Error reading Excel file. Please check the format.");
        console.error(error);
      }
    };
    reader.readAsArrayBuffer(file);
  };

  // Import products from Excel
  const importFromExcel = async () => {
    if (!auth.currentUser) {
      alert("Please login first");
      return;
    }

    if (excelData.length === 0) {
      alert("No data to import");
      return;
    }

    setImportLoading(true);

    try {
      let successCount = 0;
      
      for (const row of excelData) {
        // Get image path from Excel (e.g., "/charms/blossom.jpg")
        const imagePath = row.Image || row.image || row.ImagePath || "";
        
        const product = {
          name: row.Name || row.name || row.ProductName || "",
          price: parseFloat(row.Price || row.price || 0),
          description: row.Description || row.description || row.desc || "Handmade charm",
          category: row.Category || row.category || "Charms",
          stock: parseInt(row.Stock || row.stock || 0),
          icon: row.Icon || row.icon || "sparkles",
          images: imagePath ? [imagePath] : [],
          createdAt: new Date(),
          createdBy: auth.currentUser.uid,
        };

        if (product.name && product.price) {
          await addDoc(collection(db, "products"), product);
          successCount++;
        }
      }

      alert(`Successfully imported ${successCount} products! ✨`);
      setExcelData([]);
      setExcelFile(null);
      loadProducts();
    } catch (error) {
      console.error("Error importing products:", error);
      alert("Failed to import some products. Check console for details.");
    } finally {
      setImportLoading(false);
    }
  };

  // Upload image to existing product (Storage)
  const uploadImageToProduct = async (productId, imageFile) => {
    try {
      const storageRef = ref(storage, `products/${Date.now()}_${imageFile.name}`);
      await uploadBytes(storageRef, imageFile);
      const imageUrl = await getDownloadURL(storageRef);

      const productRef = doc(db, "products", productId);
      await updateDoc(productRef, {
        images: [imageUrl]
      });

      alert("Image uploaded successfully! ✨");
      loadProducts();
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Failed to upload image");
    }
  };

  // NEW: Update product with local image path
  const updateProductImagePath = async (productId, imagePath) => {
    try {
      const productRef = doc(db, "products", productId);
      await updateDoc(productRef, {
        images: [imagePath]
      });

      alert("Image path updated successfully! ✨");
      loadProducts();
    } catch (error) {
      console.error("Error updating image path:", error);
      alert("Failed to update image path");
    }
  };

  if (!auth.currentUser) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="glass-sidebar rounded-3xl p-12 text-center">
          <h1 className="text-4xl font-bold text-white mb-6">Admin Access Required</h1>
          <p className="text-brand-cream/80 text-xl">Please log in to access the admin panel</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="sparkles" />
      
      <div className="content-wrapper max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-brand-lavender via-brand-coral to-brand-gold bg-clip-text text-transparent">
              Product Management ✨
            </span>
          </h1>
        </div>

        {/* Tab Switcher */}
        <div className="flex gap-4 justify-center mb-8">
          <button
            onClick={() => setActiveTab("single")}
            className={`px-8 py-4 rounded-2xl font-semibold text-lg transition-all ${
              activeTab === "single"
                ? "glass-button-light"
                : "glass-button-dark"
            }`}
          >
            <Upload className="w-5 h-5 inline mr-2" />
            Single Product
          </button>
          <button
            onClick={() => setActiveTab("bulk")}
            className={`px-8 py-4 rounded-2xl font-semibold text-lg transition-all ${
              activeTab === "bulk"
                ? "glass-button-light"
                : "glass-button-dark"
            }`}
          >
            <FileSpreadsheet className="w-5 h-5 inline mr-2" />
            Excel Import
          </button>
          <button
            onClick={() => setShowProducts(!showProducts)}
            className="glass-button-dark px-8 py-4 rounded-2xl font-semibold text-lg"
          >
            📦 Manage Products ({products.length})
          </button>
        </div>

        {/* Single Product Form */}
        {activeTab === "single" && (
          <div className="glass-sidebar rounded-3xl p-8">
            <h2 className="text-3xl font-bold text-white mb-6 text-center">Add Single Product</h2>
            
            <div className="space-y-6">
              {/* Image Option Toggle */}
              <div className="glass-button-dark p-4 rounded-2xl">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={useLocalImage}
                    onChange={(e) => setUseLocalImage(e.target.checked)}
                    className="w-5 h-5 rounded"
                  />
                  <span className="text-white font-medium">
                    Use local image path (images in public/charms folder)
                  </span>
                </label>
              </div>

              {/* Conditional Image Input */}
              {useLocalImage ? (
                <div>
                  <label className="block text-white font-medium mb-3 text-lg">
                    Image Path (e.g., /charms/blossom.jpg)
                  </label>
                  <Input
                    placeholder="/charms/filename.jpg"
                    value={localImagePath}
                    onChange={(e) => setLocalImagePath(e.target.value)}
                    className="bg-white/10 backdrop-blur-md border-brand-lavender/30 text-white placeholder-brand-cream/50 text-lg py-6 rounded-2xl"
                  />
                  <p className="text-brand-cream/60 text-sm mt-2">
                    💡 Available images: blossom.jpg, petCat.jpg, bubbles.jpg, etc.
                  </p>
                </div>
              ) : (
                <div>
                  <label className="block text-white font-medium mb-3 text-lg">Upload to Firebase Storage</label>
                  <input 
                    type="file" 
                    onChange={(e) => setFile(e.target.files[0])} 
                    accept="image/*"
                    className="block w-full text-white file:mr-4 file:py-3 file:px-6 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-brand-lavender file:text-white hover:file:bg-brand-lavender/80 file:cursor-pointer cursor-pointer bg-white/10 backdrop-blur-md border border-brand-lavender/30 rounded-2xl p-3"
                  />
                </div>
              )}

              <div>
                <label className="block text-white font-medium mb-3 text-lg">Product Icon</label>
                <div className="grid grid-cols-4 md:grid-cols-8 gap-3">
                  {PRODUCT_ICONS.map(({ id, icon: Icon, label }) => (
                    <button
                      key={id}
                      type="button"
                      onClick={() => setSelectedIcon(id)}
                      className={`p-4 rounded-2xl transition-all ${
                        selectedIcon === id ? "glass-button-light scale-110" : "glass-button-dark hover:scale-105"
                      }`}
                      title={label}
                    >
                      <Icon className="w-8 h-8 mx-auto" />
                    </button>
                  ))}
                </div>
              </div>

              <Input
                placeholder="Product Name *"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-white/10 backdrop-blur-md border-brand-lavender/30 text-white placeholder-brand-cream/50 text-lg py-6 rounded-2xl"
              />

              <div className="grid grid-cols-2 gap-6">
                <Input
                  type="number"
                  step="0.01"
                  placeholder="Price ($) *"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="bg-white/10 backdrop-blur-md border-brand-lavender/30 text-white placeholder-brand-cream/50 text-lg py-6 rounded-2xl"
                />
                <Input
                  type="number"
                  placeholder="Stock"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                  className="bg-white/10 backdrop-blur-md border-brand-lavender/30 text-white placeholder-brand-cream/50 text-lg py-6 rounded-2xl"
                />
              </div>

              <Input
                placeholder="Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="bg-white/10 backdrop-blur-md border-brand-lavender/30 text-white placeholder-brand-cream/50 text-lg py-6 rounded-2xl"
              />

              <textarea
                placeholder="Description *"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                rows={5}
                className="block w-full bg-white/10 backdrop-blur-md border border-brand-lavender/30 text-white placeholder-brand-cream/50 text-lg p-4 rounded-2xl resize-none"
              />

              <Button
                onClick={uploadSingleProduct}
                disabled={loading}
                className="holo-button w-full py-6 rounded-2xl text-2xl font-bold"
              >
                {loading ? "Uploading... ⏳" : "Add Product ✨"}
              </Button>
            </div>
          </div>
        )}

        {/* Excel Import Section */}
        {activeTab === "bulk" && (
          <div className="glass-sidebar rounded-3xl p-8">
            <h2 className="text-3xl font-bold text-white mb-6 text-center">Import from Excel</h2>
            
            <div className="space-y-6">
              {/* Instructions */}
              <div className="glass-button-dark p-6 rounded-2xl">
                <h3 className="text-xl font-semibold text-white mb-3">📋 Excel Format Required:</h3>
                <p className="text-brand-cream/80 mb-2">Your Excel file should have these columns:</p>
                <ul className="list-disc list-inside text-brand-cream/70 space-y-1">
                  <li><strong>Name</strong> - Product name (required)</li>
                  <li><strong>Price</strong> - Product price in dollars (required)</li>
                  <li><strong>Description</strong> - Product description</li>
                  <li><strong>Category</strong> - Product category (e.g., Charms)</li>
                  <li><strong>Stock</strong> - Stock quantity</li>
                  <li><strong>Icon</strong> - Icon name (sparkles, heart, star, etc.)</li>
                  <li><strong>Image</strong> - Image path (e.g., /charms/blossom.jpg)</li>
                </ul>
              </div>

              {/* File Upload */}
              <div>
                <label className="block text-white font-medium mb-3 text-lg">Upload Excel File</label>
                <input 
                  type="file" 
                  onChange={handleExcelFile}
                  accept=".xlsx,.xls"
                  className="block w-full text-white file:mr-4 file:py-3 file:px-6 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-brand-lavender file:text-white hover:file:bg-brand-lavender/80 file:cursor-pointer cursor-pointer bg-white/10 backdrop-blur-md border border-brand-lavender/30 rounded-2xl p-3"
                />
              </div>

              {/* Preview Data */}
              {excelData.length > 0 && (
                <div className="glass-button-dark p-6 rounded-2xl">
                  <h3 className="text-xl font-semibold text-white mb-4">Preview ({excelData.length} products)</h3>
                  <div className="overflow-x-auto max-h-96">
                    <table className="w-full text-white text-sm">
                      <thead>
                        <tr className="border-b border-white/20">
                          <th className="px-3 py-2 text-left">Name</th>
                          <th className="px-3 py-2 text-left">Price</th>
                          <th className="px-3 py-2 text-left">Category</th>
                          <th className="px-3 py-2 text-left">Stock</th>
                          <th className="px-3 py-2 text-left">Image</th>
                        </tr>
                      </thead>
                      <tbody>
                        {excelData.slice(0, 10).map((row, idx) => (
                          <tr key={idx} className="border-b border-white/10">
                            <td className="px-3 py-2">{row.Name || row.name || '-'}</td>
                            <td className="px-3 py-2">${row.Price || row.price || 0}</td>
                            <td className="px-3 py-2">{row.Category || row.category || '-'}</td>
                            <td className="px-3 py-2">{row.Stock || row.stock || 0}</td>
                            <td className="px-3 py-2 text-xs">{row.Image || row.image || 'None'}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    {excelData.length > 10 && (
                      <p className="text-brand-cream/60 text-center mt-4">
                        + {excelData.length - 10} more products...
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* Import Button */}
              {excelData.length > 0 && (
                <Button
                  onClick={importFromExcel}
                  disabled={importLoading}
                  className="holo-button w-full py-6 rounded-2xl text-2xl font-bold"
                >
                  {importLoading ? "Importing... ⏳" : `Import ${excelData.length} Products ✨`}
                </Button>
              )}
            </div>
          </div>
        )}

        {/* Product List */}
        {showProducts && (
          <div className="glass-sidebar rounded-3xl p-8">
            <h2 className="text-3xl font-bold text-white mb-6 text-center">All Products</h2>
            
            {products.length === 0 ? (
              <p className="text-brand-cream/70 text-center text-xl">No products yet. Add your first product!</p>
            ) : (
              <div className="grid gap-6">
                {products.map((product) => (
                  <div key={product.id} className="glass-button-dark p-6 rounded-2xl">
                    <div className="flex gap-6 items-center mb-4">
                      {/* Product Image/Icon */}
                      <div className="w-24 h-24 flex-shrink-0 bg-gradient-to-br from-brand-lavender/20 to-brand-coral/20 rounded-xl flex items-center justify-center overflow-hidden">
                        {product.images && product.images[0] ? (
                          <Image
                            src={product.images[0]}
                            alt={product.name}
                            width={96}
                            height={96}
                            className="w-full h-full object-cover rounded-xl"
                            unoptimized
                          />
                        ) : (
                          <Sparkles className="w-12 h-12 text-white" />
                        )}
                      </div>

                      {/* Product Info */}
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-white">{product.name}</h3>
                        <p className="text-brand-cream/70">${product.price} • Stock: {product.stock || 0}</p>
                        <p className="text-brand-cream/60 text-sm">{product.category}</p>
                        <p className="text-brand-cream/50 text-xs mt-1">
                          Image: {product.images?.[0] || "No image"}
                        </p>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3 flex-wrap">
                      <label className="glass-button-light px-4 py-2 rounded-xl cursor-pointer hover:scale-105 transition-transform flex items-center gap-2">
                        <ImagePlus className="w-5 h-5" />
                        <span className="text-sm font-semibold">Upload to Storage</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            if (e.target.files[0]) {
                              uploadImageToProduct(product.id, e.target.files[0]);
                            }
                          }}
                        />
                      </label>

                      <button
                        onClick={() => {
                          const path = prompt("Enter image path (e.g., /charms/blossom.jpg):");
                          if (path) {
                            updateProductImagePath(product.id, path);
                          }
                        }}
                        className="glass-button-light px-4 py-2 rounded-xl hover:scale-105 transition-transform text-sm font-semibold"
                      >
                        Set Local Path
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}