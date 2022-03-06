<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Cart;
use App\Models\Product;
use Illuminate\Http\Request;

class CartController extends Controller
{
    public function addtocart(Request $request)
    {
        if(auth('sanctum')->check()){
            $user_id = auth('sanctum')->user()->id;
            $product_id = $request->product_id;
            $product_qty = $request->product_qty;
            $productCheck = Product::where('id', $product_id)->first();
            if($productCheck){
                if(Cart::where('product_id', $product_id)->where('user_id', $user_id)->exists()){
                    return response()->json([
                        'status' => 409,
                        'message' => $productCheck->name.' tồn tại trong giỏ hàng'
                    ]);
                } else{
                    $cartItem = new Cart();
                    $cartItem->user_id = $user_id;
                    $cartItem->product_id = $product_id;
                    $cartItem->product_qty = $product_qty;
                    $cartItem->save();

                    return response()->json([
                        'status' => 201,
                        'message' => 'Thêm giỏ hàng thành công'
                    ]);
                }

            }else{
                return response()->json([
                    'status' => 404,
                    'message' => 'Sản phẩm không tồn tại'
                ]);
            }
        }else{
            return response()->json([
                'status' => 401,
                'message' => 'Đăng nhập để thêm giỏ hàng'
            ]);
        }
    }

    public function viewcart()
    {
        if(auth('sanctum')->check()){
            $user_id = auth('sanctum')->user()->id;
            $cart_item = Cart::where('user_id', $user_id)->get();
            return response()->json([
                'status' => 200,
                'cart' => $cart_item
            ]);
        } else {
            return response()->json([
                'status' => 401,
                'message' => 'Đăng nhập để xem giỏ hàng'
            ]);
        }
    }
}
